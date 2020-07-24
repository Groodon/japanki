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
  deck: {
    // This string is a reference to which deck it belongs to
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },

  comment: {
    type: String
  }
},{
  collection: 'cards'
});

Card.pre('findOneAndUpdate', function () {
  console.log("asdasdasdasdasdasdasd", flat(this._update))
  this._update = flat(this._update);
});

module.exports = mongoose.model('Card', Card);
