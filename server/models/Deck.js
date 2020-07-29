// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;
let Card = require('../models/Card');
let cardOrder = require('./app-enums');

// Define collection and schema for Deck
let Deck = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cards: [Card.schema]
  ,
  // Default order is Jap->Eng which is value 1.
  order: {
    type: Number,
    default: cardOrder.JapEng
  },
  hide_hiragana: {
    type: Boolean,
    default: false
  },
  new_studied: {
    type: Number,
    default: 0
  },
  rep_studied: {
    type: Number,
    default: 0
  },
  new_max: {
    type: Number,
    default: 30
  },
  rep_max: {
    type: Number,
    default: 100
  }
  
});

module.exports = mongoose.model('Deck', Deck);
