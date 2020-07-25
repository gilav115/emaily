const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// we only require mongoose models once
// every time we require a model mongoose would attetmp to create the modeul - so, in other places we require it differently
// (e.g. passport.js)
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

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

// process.env.PORT => by heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
