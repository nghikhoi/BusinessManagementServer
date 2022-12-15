const LocalStrategy = require('passport-local');
const {passwordVerify} = require('./auth.methods');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtVariable = require('../../variables/jwt.variable');

const routeVariable = require('../../variables/routes.variable');

const { EmployeeRepository, AuthProperties, IdentifyProperties } = require('../../repositories/employee.repository');
const { PermissionUtils } = require('../../utils/permission.utils');
const { PositionRepository } = require('../../repositories/position.repository');

const usernameField = 'username';
const passwordField = 'password';

const findUser = async (username) => {
  const properties = [].concat(IdentifyProperties, AuthProperties);
  const user = await EmployeeRepository.findOneByUser(username, properties);
  if (user.position_records) {
    const permissionArrays = await Promise.all(
      user.position_records.flatMap(async (record) => {
        const position = await PositionRepository.findOne({
          where: {
            id: record.position_id
          }
        });
        return position ? position.permissions : [];
      })
    );
    user.permissions = permissionArrays.flatMap(arr => arr).map(permission => PermissionUtils.toString(permission));
  }
  return user;
};

exports.Local = new LocalStrategy({
  usernameField: usernameField,
  passwordField: passwordField,
}, async function verify(username, password, cb) {
  const user = await findUser(username);
  if (!user) {
    return cb(null, false, {message: 'Incorrect username or password.'});
  }
  await passwordVerify(password, user.salt, user.password, function(err, result) {
    if (err) {
      return cb(err);
    }
    if (result) {
      return cb(null, user);
    }
    return cb(null, false);
  });
});

const jwtGetter = ExtractJwt.fromHeader(routeVariable.ACCESS_TOKEN_FIELD);

exports.Jwt = new JwtStrategy({
  jwtFromRequest: (request => {
    return jwtGetter(request);
  }),
  secretOrKey: JwtVariable.accessTokenSecret
},  function verify(jwt_payload, done) {
  const user = jwt_payload.payload.user;
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
})
