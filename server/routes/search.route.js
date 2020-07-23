const express = require('express');
const searchRoutes = express.Router();
const request = require('request');
const querystring = require('querystring');


searchRoutes.route('/:word').get(function (req, res) {
  const url = encodeURI('https://jisho.org/api/v1/search/words?keyword='+ req.params.word);
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.status(200).send(body);
    }
    if (error) {
      console.log(error);
    }
  });
});

module.exports = searchRoutes;
