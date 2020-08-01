const express = require('express');
const userSharedDeckRoutes = express.Router();
const userSharedDeckController = require('../controllers/user-shared-deck.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

userSharedDeckRoutes.get('/', jwtAuth, userSharedDeckController.getUserSharedDecks);
//userSharedDeckRoutes.post('/', jwtAuth, userSharedDeckController.addSharedDeck);
userSharedDeckRoutes.delete('/:deckId', jwtAuth, userSharedDeckController.removeUserSharedDeck);
//userSharedDeckRoutes.get('/:deckId', jwtAuth, userSharedDeckController.getSharedDeck);

module.exports = userSharedDeckRoutes;