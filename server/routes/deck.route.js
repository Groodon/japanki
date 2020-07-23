const express = require('express');
const deckRoutes = express.Router();
const deckController = require('../controllers/deck.controller');
const jwt = require('jsonwebtoken');

let User = require('../models/User');
let Card = require('../models/Card');


const config = require('../config.json');
const accessTokenSecret = config.secret;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
}

deckRoutes.post('/', authenticateJWT, deckController.addDeck);
deckRoutes.get('/', authenticateJWT, deckController.getDecks);
deckRoutes.delete('/:id', authenticateJWT, deckController.removeDeck);
deckRoutes.get('/:id', authenticateJWT, deckController.getDeck);


module.exports = deckRoutes;
