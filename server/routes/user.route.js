// user.route.js
const userController = require('../controllers/user.controller');
const jwtAuth = require('../_helpers/jwt-authentication');
const express = require('express');
const userRoutes = express.Router();


userRoutes.get('/', jwtAuth, userController.getUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.put('/', jwtAuth, userController.updateUser);



module.exports = userRoutes;
