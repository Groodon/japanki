const express = require('express');
const sharedDeckRoutes = express.Router();
const sharedDeckController = require('../controllers/shared-deck.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

sharedDeckRoutes.get('/', jwtAuth, sharedDeckController.getSharedDecks);
sharedDeckRoutes.post('/', jwtAuth, sharedDeckController.addSharedDeck);
sharedDeckRoutes.delete('/:deckId', jwtAuth, sharedDeckController.removeSharedDeck);
sharedDeckRoutes.get('/:deckId', jwtAuth, sharedDeckController.getSharedDeck);
sharedDeckRoutes.put('/like/:deckId', jwtAuth, sharedDeckController.likeSharedDeck);

module.exports = sharedDeckRoutes;