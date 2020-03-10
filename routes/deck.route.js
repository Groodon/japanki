const express = require('express');
const deckRoutes = express.Router();
let User = require('../models/User');
let Card = require('../models/Card');

// TODO: check if deck already exists?
deckRoutes.route('/add').post(function (req, res) {
  User.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { decks: {deck_name: req.body.deck.deck_name}}},
    function (error, success) {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).json({'message': 'deck added successfully'});
      }
    });
    }
);

deckRoutes.route('/all').post(function (req, res) {
  console.log("all", req.body)
  User.findById(req.body.id).then(user => {
    if (user) {
      console.log("yay");
      res.status(200).send(user.decks);
    } else {
      console.log("aw")
      res.status(400).send({'message': "Database error"});
    }
  });
  }
);

deckRoutes.route('/get/:id').get(function (req, res) {
    Card.find({deck: req.params.id}).then(cards => {
      if (cards) {
        res.status(200).send(cards);
      } else {
        res.status(400).send({'message': 'Didn\'t find this deck'});
      }

    });
  }
);

deckRoutes.route('/delete/:id').post(function (req, res) {
  User.findOneAndUpdate(
    { _id: req.body.id },
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
