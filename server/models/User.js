// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema({
  uid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  // One-to-many relationship by referencing cards in a deck
  decks: [],
  last_login: {
    type: String,
    default: ""
  }
},{
  collection: 'users'
});

module.exports = mongoose.model('User', User);
