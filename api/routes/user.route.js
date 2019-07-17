// user.route.js

const express = require('express');
const app = express();
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
// Require Card model in our routes module
let User = require('../models/User');


// Defined store route
userRoutes.route('/register').post(function (req, res) {
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
        token
      };
      res.status(200).send(o);
    } else {
      res.status(400).send({'message': "Wrong login information"});
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
