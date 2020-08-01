let User = require('../models/User');
const Deck = require('../models/Deck');
const SharedDeck = require('../models/SharedDeck');
const mongoose = require('mongoose');

const Controller = {};


Controller.getUserSharedDecks = (req, res) => {
  SharedDeck.find({owner: req.user.sub}, (error, sharedDecks) => {
        res.status(200).send(sharedDecks);
  });
}

Controller.removeUserSharedDeck = (req, res) => {
    SharedDeck.deleteOne(
        { _id: req.params.deckId, owner: req.user.sub }, 
        (error) => {
          if (error) {
              console.log(error);
            res.status(400).send("Unable to update the database");
          } else {
            res.status(200).send();
          }
        }
    )
}


module.exports = Controller;