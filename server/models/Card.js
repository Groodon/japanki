// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Card
let Card = new Schema({
  english_word: {
    type: String,
    default: ""
  },
  japanese_reading: {
    type: String,
    default: ""
  },
  kanji: {
    type: String,
    default: ""
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
  },
  jap_eng_failed: {
    type: Boolean,
    default: false
  },
  eng_jap_failed: {
    type: Boolean,
    default: false
  },
  jap_eng_seen: {
    type: Boolean,
    default: false
  },
  eng_jap_seen: {
    type: Boolean,
    default: false
  }
},{
  collection: 'cards'
});


module.exports = mongoose.model('Card', Card);
