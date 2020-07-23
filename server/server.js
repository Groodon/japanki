//Install express server
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  errorHandler = require('./_helpers/error-handler'),
  app = express();

const cardRoute = require('./routes/card.route');
const userRoute = require('./routes/user.route');
const deckRoute = require('./routes/deck.route');
const searchRoute = require('./routes/search.route');

let uri = 'mongodb://heroku_h4b5g9nj:5uonj9efjhacsoirr0630ql6bj@ds331758.mlab.com:31758/heroku_h4b5g9nj';
mongoose.connect(uri, { useNewUrlParser: true }).then(
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
app.use('/card', cardRoute);
app.use('/users', userRoute);
app.use('/decks', deckRoute);
app.use('/search', searchRoute);


app.use(express.static('./dist/japanki'));
app.use(express.static(__dirname + '/public'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/japanki/index.html'));
});

app.use(errorHandler);

// global error handler



port = process.env.PORT || 8080;
// Start the app by listening on the default Heroku port
app.listen(port, function(){
  console.log('Listening on port ' + port)
});
