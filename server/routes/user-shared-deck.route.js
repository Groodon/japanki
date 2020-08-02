const express = require('express');
const userSharedDeckRoutes = express.Router();
const userSharedDeckController = require('../controllers/user-shared-deck.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

userSharedDeckRoutes.get('/', jwtAuth, userSharedDeckController.getUserSharedDecks);
userSharedDeckRoutes.put('/deck/:deckId/card/:cardId', jwtAuth, userSharedDeckController.updateSharedCard);
userSharedDeckRoutes.delete('/:deckId', jwtAuth, userSharedDeckController.removeUserSharedDeck);
userSharedDeckRoutes.put('/deck/:deckId', jwtAuth, userSharedDeckController.updateSharedDeck);


module.exports = userSharedDeckRoutes;