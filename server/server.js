//Install express server
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  errorHandler = require('./_helpers/error-handler'),
  app = express(),
  aws = require('aws-sdk');


let mongoUri;

if (process.env.NODE_ENV !== 'production') {
  mongoUri = require('./config.json').mongoUri;
} else {
  mongoUri = process.env.MONGODB_URI
}

const cardRoute = require('./routes/card.route');
const userRoute = require('./routes/user.route');
const deckRoute = require('./routes/deck.route');
const searchRoute = require('./routes/search.route');

mongoose.connect(mongoUri, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
// Cross-Origin Resource Sharing
app.use(cors());
app.use(bodyParser.urlencoded({encoded: false}));

// api routes
app.use('/deck', cardRoute);
app.use('/user', userRoute);
app.use('/deck', deckRoute);
app.use('/search', searchRoute);


app.use(express.static(path.resolve(__dirname, '../app/dist/japanki')));
app.use(express.static(path.resolve(__dirname, '../app/public')));

app.get('/*', function(req,res) {
  res.sendFile(path.resolve(__dirname, '../app/dist/japanki/index.html'));
});

app.use(errorHandler);

// global error handler



port = process.env.PORT || 8080;
// Start the app by listening on the default Heroku port
app.listen(port, function(){
  console.log('Listening on port ' + port)
});
