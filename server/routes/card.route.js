// card.route.js

const express = require('express');
const cardRoutes = express.Router();
const cardController = require('../controllers/card.controller');
const jwtAuth = require('../_helpers/jwt-authentication');

// Defined store route
cardRoutes.post('/', jwtAuth, cardController.addCard);
cardRoutes.put('/:id', jwtAuth, cardController.updateCard);
cardRoutes.delete('/:id', jwtAuth, cardController.deleteCard);




module.exports = cardRoutes;
