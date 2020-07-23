let Card = require('../models/Card');
let User = require('../models/User');

const Controller = {};

Controller.getDecks = (req, res) => {
  User.findOne({uid: req.user.sub}).then(user => {
    if (user) {
      res.status(200).send(user.decks);
    } else {
      res.status(400).send({'message': "Database error"});
    }
  });
}

Controller.getDeck = (req, res) => {
    Card.find({deck: req.params.id}).then(cards => {
        if (cards) {
        res.status(200).send(cards);
        } else {
        res.status(400).send({'message': 'Didn\'t find this deck'});
        }

    });
}

// TODO: check if deck already exists?
Controller.addDeck = (req, res) => {
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

Controller.removeDeck = (req, res) => {
    User.findOneAndUpdate(
        { uid: req.user.sub },
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
}

module.exports = Controller;