// Require Card model in our routes module
let Card = require('../models/Card');
let Deck = require('../models/Deck');

const Controller = {};



Controller.addCard = (req, res) => {
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
  Deck.findOneAndUpdate(
    { _id: req.params.deckId, owner: req.user.sub, 'cards._id': req.params.cardId },
    { $set: { 'cards.$.kanji': req.body.card.kanji, 'cards.$.english_word': req.body.card.english_word, 
      'cards.$.japanese_reading': req.body.card.japanese_reading, 'cards.$.jap_eng_next_study_time': req.body.card.jap_eng_next_study_time,
      'cards.$.eng_jap_next_study_time': req.body.card.eng_jap_next_study_time, 'cards.$.jap_eng_last_wait_time': req.body.card.jap_eng_last_wait_time,
      'cards.$.eng_jap_last_wait_time': req.body.card.eng_jap_last_wait_time, 'cards.$.eng_jap_status': req.body.card.eng_jap_status,
      'cards.$.jap_eng_status': req.body.card.jap_eng_status, 'cards.$.jap_eng_failed': req.body.card.jap_eng_failed,
      'cards.$.eng_jap_failed': req.body.card.eng_jap_failed, 'cards.$.jap_eng_seen': req.body.card.jap_eng_seen,
      'cards.$.eng_jap_seen': req.body.card.eng_jap_seen
    } },
    (error) => {
      if (error) {
        res.status(400).send("Unable to update the database");
      } else {
        res.status(200).send();
      }
    }
  )
}

module.exports = Controller;