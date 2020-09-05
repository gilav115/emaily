const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thank you for voting!');
  });

  app.delete('/api/survey/delete/:surveyId', requireLogin, async (req, res) => {
    await Survey.findOneAndDelete({
      _id: req.params.surveyId,
    });

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // // title -  equals to title: title because they are identical (ES6 convention)
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('api/surveys/webhooks', (req, res) => {
    const parser = new Path('/api/surveys/:surveyId/:choice');

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = parser.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // removes undefined
      .uniqBy('email', 'surveyId') // unique by given fields
      .each(({ surveyId, email, choice }) => {
        // we don't respond to SendGrid, we don't have to wait for it to finish. so it's not async
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 }, // [choice] would be either 'yes' or 'no'. it's not an array
            $set: { 'recipients.$.responded': true }, // $ is our founded one
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};
