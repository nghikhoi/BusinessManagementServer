const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.hash = async (password, salt, callback) => {
  await crypto.pbkdf2(password, salt, 310000, 32, 'sha256', callback);
}

exports.hashSync = (password, salt) => crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');

exports.passwordVerify = async (password, salt, targetPassword, callback) => {
  await exports.hash(password, salt, (err, hash) => {
    if (err) {
      return callback(err);
    }
    if (targetPassword !== hash.toString('base64')) {
      return callback(null, false);
    }
    return callback(null, true);
  });
};

exports.generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};
