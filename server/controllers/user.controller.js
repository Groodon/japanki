// Require Card model in our routes module
let User = require('../models/User');
// TODO: hide this :))
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

const jwt = require('jsonwebtoken');

let jwtSecret;

if (process.env.NODE_ENV !== 'production') {
    jwtSecret = require('../config.json').secret;
} else {
    jwtSecret = process.env.JWT_SECRET
}


const Controller = {};

async function verifyIdToken(idToken) {
    return verify(idToken).catch(console.error);
}

function jwtResponse({ sub, id }, res) {
  const token = jwt.sign({ sub }, jwtSecret);
  const o = { token, id };
  res.status(200).send(o);
}

Controller.getUser = (req, res) => {
    User.findOne({uid: req.user.sub}, (error, user) => {
        res.status(200).send(user);
    });
}

Controller.updateUser = (req, res) => {
    User.findOneAndUpdate(
        { uid: req.user.sub },
        req.body,
        (error) => {
          if (error) {
            res.status(400).send("Unable to update the database");
          } else {
            res.status(200).send();
          }
        }
      )
}

Controller.loginUser = (req, res) => {

    try {
        verifyIdToken(req.body.idToken).then(userInfo => {
            User.findOne({uid: userInfo.sub}).then(result => {
                if (result) {
                    try {
                        jwtResponse({sub: userInfo.sub, id: result.uid }, res);
                    } catch(err) {
                        console.log(err);
                        res.status(400).send("Unexpected error");
                    }
                } else {
                    let user = new User({ uid: userInfo.sub, username: userInfo.given_name, last_login: req.body.now });
                    user.save()
                    .then(u => {
                        jwtResponse({sub: userInfo.sub, id: u.uid }, res);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send({'message': "Unable to save to database"});
                    });
                }
            })
        });
        } 
    catch(err)  {
        console.log(err);
        res.status(400).send("Unexpected error");
    }
}

module.exports = Controller;