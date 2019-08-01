const express = require('express');
const searchRoutes = express.Router();
const request = require('request');

searchRoutes.route('/:word').get(function (req, res) {
  const url = 'https://jisho.org/api/v1/search/words?keyword=' + req.params.word;
  console.log("url: ", url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //console.log(body);
      res.status(200).send(body);
    }
  });
});

module.exports = searchRoutes;
