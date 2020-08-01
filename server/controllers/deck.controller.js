let User = require('../models/User');
const Deck = require('../models/Deck');
const mongoose = require('mongoose');

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
  Deck.findOne({_id: req.params.deckId}, (error, deck) => {
    if (deck && (deck.owner == req.user.sub || deck.shared)) {
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
    addDeckToUser(deck, req, res);
  })
  .catch(err => {
    console.log(err);
    res.status(400).send("unable to save to database");
  });
    
}

// Adds a shared deck to a users personal collection
Controller.addSharedDeckToUser = (req, res) => {
  Deck.findOne({_id: req.body.deckId, shared: true}, (error, deck) => {
      deck._id = mongoose.Types.ObjectId();
      deck.owner = req.user.sub;
      deck.shared = false;
      deck.isNew = true;

      deck.save().then(deck => {
        addDeckToUser(deck, req, res);
      })
    });
}

Controller.removeDeck = (req, res) => {
    Deck.deleteOne(
      { _id: req.params.deckId, owner: req.user.sub }, 
      (error) => {
        if (error) {
          res.status(400).send("Unable to update the database");
        } else {
          User.findOneAndUpdate(
            { uid: req.user.sub },
            { $pull: { decks: {_id: req.params.deckId}}},
            (error) => {
              if (error) {
                res.status(400).send("Unable to update the database");
              } else {
                res.status(200).send();
              }
        });
        }
      }
    )
}

Controller.updateDeck = (req, res) => {
  Deck.findOneAndUpdate(
    { _id: req.params.deckId, owner: req.user.sub },
    req.body.data,
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send();
      }
    }
  )
}

Controller.incrementDeck = (req, res) => {
  Deck.findOneAndUpdate(
    { _id: req.params.deckId, owner: req.user.sub },
    { $inc : req.body.data},
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send();
      }
    }
  )
}

Controller.updateDecks = (req, res) => {
  Deck.updateMany({ owner: req.user.sub},
    req.body.data,
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send();
      }
    })
}

function addDeckToUser(deck, req, res) {
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


module.exports = Controller;