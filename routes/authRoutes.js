const passport = require('passport');

module.exports = (app) => {
  // 'google' is the strategy. use it whenever user goes to this path
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // the callback that google strategy would execute upon authentication
  // to this url Google would attache a code (accessToken)
  // passport sees the code and automatically performs user info exchange with Google
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // req.logout is attached to the req object by passport
  // it resets the cookie
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // current logged-in user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
