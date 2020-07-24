// require loads the module
const mongoose = require('mongoose');
const flat = require('flat');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;
let Card = require('../models/Card');

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
});

Deck.pre('findOneAndUpdate', function () {
  console.log("asdasdasdasdasdasdasd", flat(this._update))
});

module.exports = mongoose.model('Deck', Deck);
