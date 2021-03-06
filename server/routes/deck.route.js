const express = require('express');
const deckRoutes = express.Router();
const deckController = require('../controllers/deck.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

deckRoutes.post('/', jwtAuth, deckController.addDeck);
deckRoutes.get('/', jwtAuth, deckController.getDecks);
deckRoutes.delete('/:deckId', jwtAuth, deckController.removeDeck);
deckRoutes.get('/:deckId', jwtAuth, deckController.getDeck);
deckRoutes.put('/:deckId', jwtAuth, deckController.updateDeck);
deckRoutes.put('/', jwtAuth, deckController.updateDecks);
deckRoutes.put('/increment/:deckId', jwtAuth, deckController.incrementDeck);
deckRoutes.post('/shared/', jwtAuth, deckController.addSharedDeckToUser);


module.exports = deckRoutes;
