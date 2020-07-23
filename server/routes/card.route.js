// card.route.js

const express = require('express');
const cardRoutes = express.Router();
const cardController = require('../controllers/card.controller');
const jwt = require('jsonwebtoken');

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

// Defined store route
cardRoutes.post('/', authenticateJWT, cardController.addCard);
cardRoutes.put('/:id', authenticateJWT, cardController.updateCard);
cardRoutes.delete('/:id', authenticateJWT, cardController.deleteCard);




module.exports = cardRoutes;
