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
  japanese_reading: {
    type: String
  },
  kanji: {
    type: String
  },
  next_study_time: {
    type: String,
    required: true
  },
  last_wait_time: {
    type: Number,
    default: 0
  },
  deck: {
    // This string is a reference to which deck it belongs to
    type: String,
    required: true
  },
  comment: {
    type: String
  }

},{
  collection: 'cards'
});

module.exports = mongoose.model('Card', Card);
