const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  jwt = require('./_helpers/jwt'),
  config = require('./DB'),
  errorHandler = require('./_helpers/error-handler');

const cardRoute = require('./routes/card.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
// Cross-Origin Resource Sharing
app.use(cors());
app.use('/card', cardRoute);
// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
