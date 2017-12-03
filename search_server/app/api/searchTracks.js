const Jamendo = require('../sources/jamendo');
const SoundCloud = require('../sources/soundcloud');
const Spotify = require('../sources/spotify');


async function searchTracks(req, res) {
  let tracks = [];

  for (const source of req.user.sources) {
    let search;

    if (source.name === 'Jamendo') {
      search = Jamendo.searchTracks;
    }

    if (source.name === 'SoundCloud') {
      search = SoundCloud.searchTracks;
    }

    if (source.name === 'Spotify') {
      search = Spotify.searchTracks;
    }

    tracks = tracks.concat(await search(req.params.query, source.accessToken));
  }

  if (tracks[0] === null && tracks.length === 1) {
    return res.json({ success: true, tracks: [] });
  }

  // return the tracks
  res.json({ success: true, tracks });
}

module.exports = searchTracks;
