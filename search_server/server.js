// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

const UserModel       = require('./app/models/user');
const searchTracks    = require('./app/api/searchTracks');

const User       = UserModel.User;
const SourceAccess       = UserModel.SourceAccess;

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoUrl = process.env.MONGOURL || 'localhost:27017/search_server';        // set our port

var port = process.env.PORT || 3000;        // set our port
var secret = process.env.APPSECRET || 'notSoSecretButEhWhatever';        // set our port
mongoose.connect('mongodb://' + mongoUrl, { useMongoClient: true }); // connect to our database
app.set('superSecret', secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

const verifyToken = async function(req, res, next) {
  var user = await User.findById(req.headers.token);

  if (user === null) {
    res.status(403).send('Wrong token');
  }

  req.user = user;

  next();
}


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.get('/searchTracks', verifyToken, searchTracks);
router.get('/searchPlaylists', verifyToken, async function(req, res) {
  res.json({ success: true });
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
