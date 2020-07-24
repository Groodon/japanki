const jwt = require('jsonwebtoken');

const config = require('../config.json');
const accessTokenSecret = config.secret;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          console.log("asdasdasdads", user.sub);
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
}

module.exports = authenticateJWT;