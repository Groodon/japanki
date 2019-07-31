const express = require('express');
const app = express();
const deckRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let User = require('../models/User');
let Card = require('../models/Card');

// TODO: check if deck already exists?
deckRoutes.route('/add').post(function (req, res) {
  User.findOneAndUpdate(
    { _id: req.user.sub },
    { $push: { decks: {deck_name: req.body.deck_name}}},
    function (error, success) {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).json({'message': 'deck added successfully'});
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

deckRoutes.route('/get/:id').get(function (req, res) {
    Card.find({deck: req.params.id}).then(cards => {
      res.status(200).send(cards);
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
        // Delete all cards in deck
        Card.find({ deck: req.params.id }).remove().exec().then(
          res.json({'message': 'deck removed successfully'})
        );

      }
    });
});


module.exports = deckRoutes;
