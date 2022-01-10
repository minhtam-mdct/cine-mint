const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;

passport.use(
  new Strategy(
    {
      clientID: "minhtam",
      clientSecret: "qweqwe",
      callbackURL: "/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = {
  passport,
};
