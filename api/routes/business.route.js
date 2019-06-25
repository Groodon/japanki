// business.route.js

const express = require('express');
const app = express();
const businessRoutes = express.Router();

// Require Card model in our routes module
let Business = require('../models/Business');

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("unable to save to database");
    });
});

businessRoutes.route('/add').get(function (req, res) {
  console.log(req.body)
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
  Business.find(function (err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
    res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
  Business.findById(req.params.id, function(err, business) {
    if (!business) {
      return res.status(400).send(err);
    }
    else {
      business.english_word = req.body.english_word;
      business.japanese_word = req.body.japanese_word;
      business.business_gst_number = req.body.business_gst_number;

      business.save().then(business => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  Business.findOneAndRemove({_id: req.params.id}, function(err, business){
    console.log(req.params.id);
    if(err) res.json(err);
    else if (!business) res.status(404).send('business not found');
    else res.json('Successfully removed');
  });
});

module.exports = businessRoutes;
