const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// we only require mongoose models once
// every time we require a model mongoose would attetmp to create the modeul - so, in other places we require it differently
// (e.g. passport.js)
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

// body-parser is an express middleware
// so we need wire it to express via the app.use call
app.use(bodyParser.json());

// takes the cookie data and assigns it to req.session
// this is the data passport uses to deserializeUser etc.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long sesstion lasts (ms)
    keys: [keys.cookieKey], // a key to encrypt the cookie, it's an array becuase we can provide multiple keys for extra security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  // make sure express serve up production assests, e.g. main.js, main.css
  // upon "npm run build" (in client folder) files will be in client -> build folder
  app.use(express.static('client/build'));

  // if a request is made to a route express doesn't know (e.g. /surveys)
  // make sure express serve up index.html file from our client side
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// process.env.PORT => by heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
