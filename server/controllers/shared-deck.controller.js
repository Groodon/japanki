let User = require('../models/User');
const Deck = require('../models/Deck');
const SharedDeck = require('../models/SharedDeck');
const mongoose = require('mongoose');

const Controller = {};


Controller.getSharedDecks = (req, res) => {
  SharedDeck.find({}, (error, sharedDecks) => {
        res.status(200).send(sharedDecks);
  });
}

Controller.getSharedDeck = (req, res) => {
  Deck.findOne({_id: req.params.deckId}, (error, deck) => {
      res.status(200).send(deck);
  });
}


Controller.addSharedDeck = (req, res) => {
  Deck.findOne({_id: req.body.deckId, owner: req.user.sub}, (error, deck) => {
    let newDeck = new Deck({owner: req.user.sub, name: deck.name, cards: deck.cards, shared: true});
    newDeck.cards.forEach((card, index, cards) => {
      card.jap_eng_next_study_time = 0;
      card.eng_jap_next_study_time = 0;
      card.jap_eng_last_wait_time = 0;
      card.eng_jap_last_wait_time = 0;
      card.eng_jap_status = 0;
      card.jap_eng_status = 0;
      card.jap_eng_failed = false;
      card.eng_jap_failed = false;
      card.jap_eng_seen = false;
      card.eng_jap_seen = false;
      cards[index] = card;
    });
    newDeck.save().then((deck) => {
        let sharedDeck = SharedDeck({owner: req.user.sub, name: deck.name, deck_id: deck._id});
        sharedDeck.save().then(deck => {
            res.status(200).send();
        })
    })
  });
}

Controller.removeSharedDeck = (req, res) => {
  SharedDeck.deleteOne(
    { _id: req.params.deckId, owner: req.user.sub }, 
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send();
      }
    }
  )
}

Controller.likeSharedDeck = (req, res) => {
  SharedDeck.findOneAndUpdate(
    { uid: req.user.sub },
    { $push: { decks: {_id: deck._id}}}, 
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).json({'message': 'deck added successfully'});
  }});
}



module.exports = Controller;