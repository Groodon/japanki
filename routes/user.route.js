// user.route.js
const CLIENT_ID = "471391585101-8rhggm7ek2va7uqbula56oj2rn80b3ah.apps.googleusercontent.com"

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return payload;
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}

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
    //let query = User.findOne({email: req.body.email});
    //let result = query.exec();
    User.findOne({email: req.body.email}).then(result => {
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

async function authenticate2({token}) {
    return verify(token).catch(console.error);
}

function authenticate({ sub, id }, res) {
  const token = jwt.sign({ sub }, config.secret);
  const o = { token, id };
  res.status(200).send(o);
}

//hehehe
userRoutes.route('/authenticate').post(function (req, res) {
  try {
    authenticate(req.body, res);
  } catch(err)  {
    console.log(err);
    res.status(400).send("Unexpected error");
  }
});

userRoutes.route('/login').post(function (req, res) {
  try {
    authenticate2(req.body).then(token => {
      console.log(token)
      User.findOne({uid: token.sub}).then(result => {
        if (result) {
          try {
            authenticate({sub: token.sub, id: result._id }, res);
          } catch(err) {
            console.log(err);
            res.status(400).send("Unexpected error");
          }
        } else {
          let user = new User({uid: token.sub, username: token.given_name});
          user.save()
            .then(u => {
              authenticate({sub: token.sub, id: u._id }, res);
            })
            .catch(err => {
              res.status(400).send({'message': "Unable to save to database"});
            });
        }
      })
    });
  } catch(err)  {
    console.log(err);
    res.status(400).send("Unexpected error");
  }
});


module.exports = userRoutes;
