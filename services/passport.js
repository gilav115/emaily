const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serializeUser determines which data of the user object should be stored in the session
// we use the user id from mongo
// in passport.use we retrieve/create user instance, this instance is automcatically passed to serializeUser via the done method
// after strategy is done passport calls serializeUser automatically
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// use the id to retrieve the user instance from Mongo
// the user would be added to the request object like so: req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// we can use other strategies (LinkedIn, FB...)
// we just need to define it and the route handler
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    // this is the accessToken we get as a reply from Google
    (accessToken, refreshToken, profile, done) => {
      console.log('Recieved user: ', profile.id);
      // the user in done function is passed to serializeUser
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log('existingUser: ', existingUser);
          done(null, existingUser);
        } else {
          console.log('creating new user: ', profile.id);
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
