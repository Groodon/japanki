// user.route.js

const express = require('express');
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const { check, validationResult } = require('express-validator');
// Require Card model in our routes module
let User = require('../models/User');

let pwErrorMsg = 'Password should not be empty, minimum eight characters, at least one letter and one number';

userRoutes.route('/register').post(
  [check('email').isEmail()
    .withMessage('Incorrect email'),
  check('password').exists()
    .withMessage(pwErrorMsg + 1)

    .isLength({ min: 8 })
    .withMessage(pwErrorMsg + 2)

    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(pwErrorMsg + 3)],

  function (req, res) {
    // Validate the email and password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorResponse = errors.array({ onlyFirstError: true });
      return res.status(422).json({message: errorResponse[0].msg});
    }

    let query = User.findOne({email: req.body.email});
    let result = query.exec();
    result.then(result => {
      if (result) {
        res.status(400).send({'message': "This email is already registered"});
      } else {
        let user = new User(req.body);
        user.save()
          .then(user => {
            res.status(200).json({'user': 'user added successfully'});
          })
          .catch(err => {
            res.status(400).send({'message': "Unable to save to database"});
          });
      }
    });
});


function authenticate({ email, password }, res) {
  let query = User.findOne({email: email, password: password});
  let result = query.exec();

  result.then(result => {
    if (result) {
      // First obj is a payload, sub is subject
      const token = jwt.sign({sub: result._id}, config.secret);
      let o = {
        email,
        password,
        username: result.username,
        id: result._id,
        token
      };
      res.status(200).send(o);
    } else {
      res.status(400).send({'message': "Incorrect login information"});
    }
  })
}


userRoutes.route('/authenticate').post(function (req, res) {
  try {
    authenticate(req.body, res);
  } catch(err)  {
    console.log(err);
    res.status(400).send("Unexpected error");
  }
});


module.exports = userRoutes;
