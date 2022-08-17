const passport = require("passport");
const passportGitHub2 = require("passport-github2");

const gitHubStrategy = new passportGitHub2.Strategy(
  {
    clientID: "8547191a9de512709e7e",
    clientSecret: "52580d27cf229938e4a8ebd61c27d789313ecccc",
    callbackURL: "http://localhost:3000/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    const user = { username: profile.username };
    done(null, profile);
  }
);

passport.use(gitHubStrategy)

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

function checkAuthorization(req, res, next) {
  if(req.isAuthenticated()) {
  return next()
  } else {
    res.status(401).end()
  }

}

module.exports = {passport, checkAuthorization}