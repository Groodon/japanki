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
}

const express = require('express');
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const { check, validationResult } = require('express-validator');
// Require Card model in our routes module
let User = require('../models/User');


async function verifyIdToken({idToken}) {
    return verify(idToken).catch(console.error);
}

function jwtResponse({ sub, id }, res) {
  const token = jwt.sign({ sub }, config.secret);
  const o = { token, id };
  res.status(200).send(o);
}

/*
  Verifies the google id token sent from the client to authenticate the user
  Creates a new user if the uid is not in our database
  Returns the jwt with the uid as the username
 */
userRoutes.route('/login').post(function (req, res) {
  try {
    verifyIdToken(req.body).then(userInfo => {
      User.findOne({uid: userInfo.sub}).then(result => {
        if (result) {
          try {
            jwtResponse({sub: userInfo.sub, id: result._id }, res);
          } catch(err) {
            console.log(err);
            res.status(400).send("Unexpected error");
          }
        } else {
          let user = new User({uid: userInfo.sub, username: userInfo.given_name});
          user.save()
            .then(u => {
              jwtResponse({sub: userInfo.sub, id: u._id }, res);
            })
            .catch(err => {
              console.log(err);
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
