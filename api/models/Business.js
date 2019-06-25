// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Card
let Business = new Schema({
  english_word: {
    type: String
  },
  japanese_word: {
    type: String
  },
  business_gst_number: {
    type: Number
  }
},{
  collection: 'business'
});

module.exports = mongoose.model('Card', Business);
