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
  jap_eng_next_study_time: {
    type: String,
    required: true
  },
  eng_jap_next_study_time: {
    type: String,
    required: true
  },
  jap_eng_last_wait_time: {
    type: Number,
    default: 0
  },
  eng_jap_last_wait_time: {
    type: Number,
    default: 0
  },
  eng_jap_status: {
    type: Number,
    default: 0
  },
  jap_eng_status: {
    type: Number,
    default: 0
  }
},{
  collection: 'cards'
});


module.exports = mongoose.model('Card', Card);
