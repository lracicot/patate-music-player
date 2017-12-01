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


const port = process.env.PORT || 3001;
const secret = process.env.APPSECRET || 'notSoSecretButEhWhatever';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', secret);


const router = express.Router();

router.post('/register', function(req, res) {
  const user = new User({
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
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user !== null) {
    res.json({ success: true, token: user._id });
  }
  res.json({ success: false });
});


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
