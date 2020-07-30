// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Deck
let SharedDeck = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  deck_id: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Deck', Deck);