// require loads the module
const mongoose = require('mongoose');
const Deck = require('./Deck');
// Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

// Define collection and schema for Deck
let SharedDeck = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  liked_users: [],
  downloads: {
    type: Number,
    default: 0
  },
  deck_id: {
      type: String,
      required: true
  }
});

SharedDeck.pre('deleteOne', function(next) {
    Deck.deleteOne({ deck_id: this.deck_id, shared: true, owner: this.owner }, next);
});

SharedDeck.post('findOneAndUpdate', function(doc) {
  Deck.findOneAndUpdate(
    { _id: doc.deck_id, owner: doc.owner },
    { $set: { name: doc.name
    } },
    (error) => {
    }
  )
});

module.exports = mongoose.model('SharedDeck', SharedDeck);
