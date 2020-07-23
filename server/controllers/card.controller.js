// Require Card model in our routes module
let Card = require('../models/Card');
const Controller = {};

Controller.addCard = (req, res) => {
    let card = new Card(req.body);
    card.save()
      .then(card => {
        res.status(200).json({'card': 'card added successfully'});
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("unable to save to database");
      });
}

Controller.deleteCard = (req, res) => {
    Card.findOneAndRemove({_id: req.params.id}, function(err, card){
        if(err) res.json(err);
        else if (!card) res.status(404).send('card not found');
        else {
          // TODO: send back dataset
          res.json({'message': 'card deleted'});
        }
    });
}

Controller.updateCard = (req, res) => {
    Card.findById(req.params.id, function(err, card) {
        if (!card) {
          return res.status(400).send(err);
        }
        else {
          card.english_word = req.body.english_word;
          card.japanese_reading = req.body.japanese_reading;
          card.kanji = req.body.kanji;
          if (req.body.jap_eng_last_wait_time)
            card.jap_eng_last_wait_time = req.body.jap_eng_last_wait_time;
          if (req.body.eng_jap_last_wait_time)
            card.eng_jap_last_wait_time = req.body.eng_jap_last_wait_time;
          if (req.body.jap_eng_next_study_time)
            card.jap_eng_next_study_time = req.body.jap_eng_next_study_time;
          if (req.body.eng_jap_next_study_time)
            card.eng_jap_next_study_time = req.body.eng_jap_next_study_time;
          if (req.body.order)
            card.order = req.body.order;
    
          card.save().then(card => {
            res.status(200).send();
          })
            .catch(err => {
              res.status(400).send("unable to update the database");
            });
        }
    });
}

module.exports = Controller;