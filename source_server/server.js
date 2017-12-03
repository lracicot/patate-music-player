const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const UserModel  = require('./app/models/user');
const User       = UserModel.User;
const SourceAccess = UserModel.SourceAccess;

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!', err);
});

const mongoUrl = process.env.MONGOURL || 'localhost:27017/auth_server';
mongoose.connect('mongodb://' + mongoUrl, { useMongoClient: true });


const port = process.env.PORT || 3002;
const secret = process.env.APPSECRET || 'notSoSecretButEhWhatever';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', secret);

const verifyToken = async function(req, res, next) {
  req.user = await User.findById(req.headers.token);

  if (req.user === null) {
    res.status(403).send('Wrong token');
  }

  next();
}


var router = express.Router();

router.get('/getAvailableSources', async function(req, res) {
    res.json({
      sources: [{
          name: "Jamendo",
          logo: "http://www.userlogos.org/files/logos/43932_aleksandr009/jamendo_1_1.png",
        }, {
          name: "SoundCloud",
          logo: "https://developers.soundcloud.com/assets/logo_big_black-4fbe88aa0bf28767bbfc65a08c828c76.png",
        }, {
          name: "Spotify",
          logo: "https://developer.spotify.com/wp-content/uploads/2016/07/icon2@2x.png",
        },
      ]
    });
});

router.get('/getSources', verifyToken, function(req, res) {
    res.json(req.user.sources);
});

router.post('/addSource', verifyToken, async function(req, res) {
  const { name, accessToken } = req.body;
  const sourceAccess = new SourceAccess({
    name,
    accessToken,
  });

  req.user.sources.push(sourceAccess);

  req.user.save(function(error) {
    if (!error) {
      console.log('SourceAccess saved successfully');
      const source = req.user.sources.find(s => s.name === name);
      source.id = source._id;
      res.json({ success: true, source });
    }

    res.json({ success: false, error });
  });
});

router.delete('/removeSource/:sourceId', verifyToken, async function(req, res) {
  const sourceAccess = req.user.sources.id(req.params.sourceId).remove();

  req.user.save(function(error) {
    if (!error) {
      console.log('SourceAccess removed successfully');
      res.json({ success: true });
    }

    res.json({ success: false, error });
  });
});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
