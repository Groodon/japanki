const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');

let jwtSecret;

if (process.env.NODE_ENV !== 'production') {
    jwtSecret = require('../config.json').secret;
} else {
    jwtSecret = process.env.JWT_SECRET
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, jwtSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      console.log(req.body);
      res.sendStatus(401);
  }
}

module.exports = authenticateJWT;