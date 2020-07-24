// Require Card model in our routes module
let Card = require('../models/Card');
let Deck = require('../models/Deck');
let User = require('../models/User');

const Controller = {};

Controller.addCard = (req, res) => {
    // Check if user have the deck id in decks
    // Find the deck
    // Add the card to the deck
    
    Deck.findOneAndUpdate(
      { _id: req.params.deckId, owner: req.user.sub },
      { $push: { cards: Card(req.body.card)}}, 
      (error) => {
        if (error) {
          res.status(400).send("Unable to update the database");
        } else {
          res.status(200).json({'message': 'card added successfully'});
        }
    });
}

Controller.deleteCard = (req, res) => {
  Deck.findOneAndUpdate(
    { _id: req.params.deckId, owner: req.user.sub },
    { $pull: { cards: { _id: req.params.cardId}}}, 
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).json({'message': 'card removed successfully'});
      }
    }
  )
    
}

Controller.updateCard = (req, res) => {
  console.log(req.body)
  Deck.findOneAndUpdate(
    { _id: req.params.deckId, owner: req.user.sub, 'cards._id': req.params.cardId },
    { $set: { 'cards.$': req.body.card } },
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send();
      }
    }
  )
  // Card.findById(req.params.id, function(err, card) {
  //     if (!card) {
  //       return res.status(400).send(err);
  //     }
  //     else {
  //       card.english_word = req.body.english_word;
  //       card.japanese_reading = req.body.japanese_reading;
  //       card.kanji = req.body.kanji;
  //       if (req.body.jap_eng_last_wait_time)
  //         card.jap_eng_last_wait_time = req.body.jap_eng_last_wait_time;
  //       if (req.body.eng_jap_last_wait_time)
  //         card.eng_jap_last_wait_time = req.body.eng_jap_last_wait_time;
  //       if (req.body.jap_eng_next_study_time)
  //         card.jap_eng_next_study_time = req.body.jap_eng_next_study_time;
  //       if (req.body.eng_jap_next_study_time)
  //         card.eng_jap_next_study_time = req.body.eng_jap_next_study_time;
  //       if (req.body.order)
  //         card.order = req.body.order;
  
  //       card.save().then(card => {
  //         res.status(200).send();
  //       })
  //         .catch(err => {
  //           res.status(400).send("unable to update the database");
  //         });
  //     }
  // });
}

module.exports = Controller;