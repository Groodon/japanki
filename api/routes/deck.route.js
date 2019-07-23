const express = require('express');
const app = express();
const deckRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let User = require('../models/User');

// TODO: check if deck already exists?
deckRoutes.route('/add').post(function (req, res) {
  User.findOneAndUpdate(
    { _id: req.user.sub },
    { $push: { decks: {deck_name: req.body.deck_name}}},
    function (error, success) {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send("Deck created");
      }
    });
    }
);

deckRoutes.route('/all').get(function (req, res) {
  User.findById(req.user.sub).then(user => {
    if (user) {
      res.status(200).send(user.decks);
    } else {
      res.status(400).send({'message': "Database error"});
    }
  });
  }
);

deckRoutes.route('/delete/:id').get(function (req, res) {
  User.findOneAndUpdate(
    { _id: req.user.sub },
    { $pull: { decks: {_id: req.params.id}}},
    function (error, success) {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.json('Successfully removed');
      }
    });
});


module.exports = deckRoutes;
