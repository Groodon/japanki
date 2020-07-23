// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Deck
let Deck = new Schema({
  deck_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Deck', Deck);
