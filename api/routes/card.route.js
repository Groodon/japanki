// card.route.js

const express = require('express');
const cardRoutes = express.Router();

// Require Card model in our routes module
let Card = require('../models/Card');

// Defined store route
cardRoutes.route('/add').post(function (req, res) {
  let card = new Card(req.body);
  card.save()
    .then(card => {
      res.status(200).json({'card': 'card added successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("unable to save to database");
    });
});

cardRoutes.route('/add').get(function (req, res) {
  console.log(req.body)
});

// Defined get data(index or listing) route
cardRoutes.route('/').get(function (req, res) {
  Card.find(function (err, card){
    if(err){
      console.log(err);
    }
    else {
      res.json(card);
    }
  });
});

// Defined edit route
cardRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Card.findById(id, function (err, card){
    res.json(card);
  });
});

//  Defined update route
cardRoutes.route('/update').post(function (req, res) {
  Card.findById(req.body._id, function(err, card) {
    if (!card) {
      return res.status(400).send(err);
    }
    else {
      card.english_word = req.body.english_word;
      card.japanese_reading = req.body.japanese_reading;
      if (req.body.jap_eng_last_wait_time)
        card.jap_eng_last_wait_time = req.body.jap_eng_last_wait_time;
      if (req.body.eng_jap_last_wait_time)
        card.eng_jap_last_wait_time = req.body.eng_jap_last_wait_time;
      if (req.body.jap_eng_next_study_time)
        card.jap_eng_next_study_time = req.body.jap_eng_next_study_time;
      if (req.body.eng_jap_next_study_time)
        card.eng_jap_next_study_time = req.body.eng_jap_next_study_time;
      card.kanji = req.body.kanji;
      card.comment = req.body.comment;
      if (req.body.order)
        card.order = req.body.order;

      card.save().then(card => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
cardRoutes.route('/delete/:id').get(function (req, res) {
  Card.findOneAndRemove({_id: req.params.id}, function(err, card){
    console.log(req.params.id);
    if(err) res.json(err);
    else if (!card) res.status(404).send('card not found');
    else {
      // TODO: send back dataset
      res.json({'message': 'card deleted'});
    }
  });
});

module.exports = cardRoutes;
