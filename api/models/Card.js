// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Card
let Card = new Schema({
  english_word: {
    type: String
  },
  japanese_word: {
    type: String
  },
  comment: {
    type: String
  }
},{
  collection: 'business'
});

module.exports = mongoose.model('Card', Card);
