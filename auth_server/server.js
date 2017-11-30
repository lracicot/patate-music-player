// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
const UserModel       = require('./app/models/user');
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

var mongoUrl = process.env.MONGOURL || 'localhost:27017/auth_server';        // set our port

var port = process.env.PORT || 3001;        // set our port
var secret = process.env.APPSECRET || 'notSoSecretButEhWhatever';        // set our port
mongoose.connect('mongodb://' + mongoUrl, { useMongoClient: true }); // connect to our database
app.set('superSecret', secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const verifyToken = async function(req, res, next) {
  var user = await User.findById(req.body.token);

  if (user === null) {
    res.status(403).send('Wrong token');
  }

  req.user = user;

  next();
}


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.post('/register', function(req, res) {
  // create a sample user
  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save(function(err) {
    if (!err) {
      console.log('User saved successfully');
      res.json({ success: true, token: user._id });
    }

    res.json({ success: false, error: 'username already taken' });
  });
});

router.post('/login', async function(req, res) {
  // create a sample user
  var user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user !== null) {
    res.json({ success: true, token: user._id });
  }
  res.json({ success: false });
});

router.post('/addSource', verifyToken, async function(req, res) {
  const sourceAccess = new SourceAccess({
    source: req.body.source,
    accessToken: req.body.accessToken,
  });

  req.user.sources.push(sourceAccess);

  req.user.save(function(err) {
    if (!err) {
      console.log('SourceAccess saved successfully');
      res.json({ success: true });
    }

    res.json({ success: false });
  });
});

router.get('/getSources', verifyToken, async function(req, res) {
    res.json(req.user.sources);
});

router.delete('/removeSource', verifyToken, async function(req, res) {
  const sourceAccess = req.user.sources.id(req.body.sourceId).remove();

  req.user.save(function(err) {
    if (!err) {
      console.log('SourceAccess removed successfully');
      res.json({ success: true });
    }

    res.json({ success: false });
  });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
