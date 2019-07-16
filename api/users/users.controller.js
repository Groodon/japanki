const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function register(req, res, next) {
  userService.register(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'An account with this email already exists' }))
    .catch(err => next(err));
}
