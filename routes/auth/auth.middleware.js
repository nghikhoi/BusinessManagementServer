const passport = require('passport');
const routeVariable = require('../../variables/routes.variable');

const verify = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, {session: false}, function(err, user, info, status) {
      if (err) {
        return next(err);
      }
      if (!user) {
        const json = {};
        json[routeVariable.AUTHENTICATED_FIELD] = false;
        return res.json(json);
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

exports.verifyUserLocal = verify('local');

exports.verifyToken = verify('jwt');
