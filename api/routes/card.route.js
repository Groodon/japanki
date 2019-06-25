// card.route.js

const express = require('express');
const app = express();
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
cardRoutes.route('/update/:id').post(function (req, res) {
  Card.findById(req.params.id, function(err, card) {
    if (!card) {
      return res.status(400).send(err);
    }
    else {
      card.english_word = req.body.english_word;
      card.japanese_word = req.body.japanese_word;
      card.comment = req.body.comment;

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
    else res.json('Successfully removed');
  });
});

module.exports = cardRoutes;
