//Install express server
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  jwt = require('./_helpers/jwt'),
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
db.once('open', function callback() {

  // Create song schema
  let songSchema = mongoose.Schema({
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
  });

  // Store song documents in a collection called "songs"
  let Song = mongoose.model('songs', songSchema);

  // Create seed data
  let seventies = new Song({
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  });

  let eighties = new Song({
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  });

  let nineties = new Song({
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  });

  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */

  let list = [seventies, eighties, nineties]

  Song.insertMany(list).then(() => {

    /*
     * Then we need to give Boyz II Men credit for their contribution
     * to the hit "One Sweet Day".
     */

    return Song.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} })

  }).then(() => {

    /*
     * Finally we run a query which returns all the hits that spend 10 or
     * more weeks at number 1.
     */

    return Song.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1})

  }).then(docs => {

    docs.forEach(doc => {
      console.log(
        'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
        ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
      );
    });

  }).then(() => {

    // Since this is an example, we'll clean up after ourselves.
    return mongoose.connection.db.collection('songs').drop()

  }).catch(err => {

    // Log any errors that are thrown in the Promise chain
    console.log(err)

  })
});
app.use(bodyParser.json());
// Cross-Origin Resource Sharing
app.use(cors());
app.use(jwt());

// api routes
app.use('/card', cardRoute);
app.use('/users', userRoute);
app.use('/decks', deckRoute);
app.use('/search', searchRoute);
// global error handler
//app.use(errorHandler);
// Serve only the static files form the dist directory
app.use(express.static('./dist/japanki'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/japanki/index.html'));
});

port = process.env.PORT || 8080;
// Start the app by listening on the default Heroku port
app.listen(port, function(){
  console.log('Listening on port ' + port)
});
