const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');

let s3 = new aws.S3({
    jwtSecret: process.env.JWT_SECRET
});
const accessTokenSecret = s3.jwtSecret || require('../config.json').secret;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
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