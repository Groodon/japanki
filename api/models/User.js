// require loads the module
const mongoose = require('mongoose');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Card
let User = new Schema({
  user: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true
  }
},{
  collection: 'users'
});

module.exports = mongoose.model('User', User);
