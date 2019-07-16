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
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'card': 'card added successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("unable to save to database");
    });
});



async function getUser(username, password) {

}

function authenticate({ username, password }, res) {
  let foundUser = '';
  let query = User.findOne({email: username, password: password});
  let result = query.exec();

  result.then(result => {
    console.log("ASD", result);
    console.log("asdasd");
    if (result) {

      // First obj is a payload, sub is subject
      const token = jwt.sign({sub: result._id}, config.secret);
      let o = {
        username,
        password,
        token
      };
      res.status(200).send(o);
    } else {
      res.status(400).send("Incorrect login information");
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
