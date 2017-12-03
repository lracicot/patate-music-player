const Jamendo = require('../sources/jamendo');
const SoundCloud = require('../sources/soundcloud');
const Spotify = require('../sources/spotify');


async function searchPlaylist(req, res) {
  let playlists = [];

  for (const source of req.user.sources) {
    let search;

    if (source.name === 'Jamendo') {
      search = Jamendo.searchPlaylists;
    }

    if (source.name === 'SoundCloud') {
      search = SoundCloud.searchPlaylists;
    }

    if (source.name === 'Spotify') {
      search = Spotify.searchPlaylists;
    }

    playlists = playlists.concat(await search(req.params.query, source.accessToken));
  }

  // return the playlists
  res.json({ success: true, playlists });
}

module.exports = searchPlaylist;
