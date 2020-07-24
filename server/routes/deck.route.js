const express = require('express');
const deckRoutes = express.Router();
const deckController = require('../controllers/deck.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

deckRoutes.post('/', jwtAuth, deckController.addDeck);
deckRoutes.get('/', jwtAuth, deckController.getDecks);
deckRoutes.delete('/:id', jwtAuth, deckController.removeDeck);
deckRoutes.get('/:id', jwtAuth, deckController.getDeck);


module.exports = deckRoutes;
