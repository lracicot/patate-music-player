const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Axios = require('axios');

const searchTracks = require('./app/api/searchTracks');
const searchPlaylist  = require('./app/api/searchPlaylist');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authUrl = process.env.AUTHURL || 'http://localhost:3001';
const port = process.env.PORT || 3000;
const secret = process.env.APPSECRET || 'notSoSecretButEhWhatever';
app.set('superSecret', secret);

const verifyToken = async function(req, res, next) {
  const { data } = await Axios.get(authUrl + '/api/getUser/' + req.headers.token);

  if (data.success === false) {
    return res.status(403).send('Wrong token');
  }

  req.user = data.user;

  next();
}

const router = express.Router();

router.get('/searchTracks/:query', verifyToken, searchTracks);
router.get('/searchPlaylists/:query', verifyToken, searchPlaylist);

app.use('/api', router);

app.listen(port);
