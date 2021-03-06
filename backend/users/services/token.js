const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'securesecret';

// Pass user content and create a token for that particular user
const create = payload => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        (err, token) => (err ? reject(err) : resolve(token)),
      );
    });
  };

module.exports = create;
