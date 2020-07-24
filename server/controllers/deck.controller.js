let Card = require('../models/Card');
let User = require('../models/User');
const Deck = require('../models/Deck');

const Controller = {};

// Get all deck info from the Deck collection through the ids in the user's decks
Controller.getDecks = (req, res) => {
  User.findOne({uid: req.user.sub}, (error, user) => {
    if (user) {
      Deck.find({'_id': { $in: user.decks }
      }, (err, decks) => {
        res.status(200).send(decks)
      })
    } else {
      res.status(400).send({"message": "Unable to find user"});
    }
  });
}

Controller.getDeck = (req, res) => {
  Deck.findOne({_id: req.params.id}, (error, deck) => {
    if (deck && deck.owner == req.user.sub) {
      res.status(200).send(deck);
    } else {
      res.status(400).send({"message": "Unable to find deck or unauthorized user"});
    }
  });
}

// Create a deck with a relation to the owner id
// Add the new deck id to the user's list of decks
Controller.addDeck = (req, res) => {
  let deck = Deck({owner: req.user.sub, name: req.body.deck.name});
  deck.save().then(deck => {
    User.findOneAndUpdate(
      { uid: req.user.sub },
      { $push: { decks: {_id: deck._id}}}, 
      (error) => {
        if (error) {
          res.status(400).send("Unable to update the database");
        } else {
          res.status(200).json({'message': 'deck added successfully'});
      }});
  })
  .catch(err => {
    console.log(err);
    res.status(400).send("unable to save to database");
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

    Deck.findOne({_id: req.body.deckId}, (error, deck) => {
      if (deck && deck.owner == req.params.id) {
        deck.cards.push(Card(req.body.card));
        deck.save((err) => {
          if (err) {
            res.status(400).send({"message": "unable to save card"})
          } else {
            res.sendStatus(200)
          }
        });
      } else {
        res.status(400).send({"message": "Unable to find deck or unauthorized user"});
      }
    });
}

module.exports = Controller;