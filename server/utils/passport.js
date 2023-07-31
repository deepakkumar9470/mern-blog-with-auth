const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/User')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },

  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);  
      // const user = {
      //   username : profile.displayName,
      //   avatar : profile.photos[0],
      // }
      // user.save()
  }
));

passport.serializeUser((user,done) =>{
  done(null,user)
});

passport.deserializeUser((user,done) =>{
  done(null,user)
})