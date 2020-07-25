const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');

let jwtSecret;

if (process.env.NODE_ENV !== 'production') {
    jwtSecret = require('../config.json').secret;
} else {
    let s3 = new aws.S3({
        jwtSecret: process.env.JWT_SECRET
    });
    jwtSecret = s3.jwtSecret
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
      res.sendStatus(401);
  }
}

module.exports = authenticateJWT;