// card.route.js

const express = require('express');
const cardRoutes = express.Router();
const cardController = require('../controllers/card.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

// Defined store route
cardRoutes.post('/:deckId/card/', jwtAuth, cardController.addCard);
cardRoutes.put('/:deckId/card/:cardId', jwtAuth, cardController.updateCard);
cardRoutes.delete('/:deckId/card/:cardId', jwtAuth, cardController.deleteCard);




module.exports = cardRoutes;
