const expressJwt = require('express-jwt');
const config = require('../config.json');

function jwt() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
      '/login',
      '/',
      'home'
    ]
  });
}

module.exports = jwt;
