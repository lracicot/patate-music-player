const Jamendo = require('../sources/jamendo');


async function searchTracks(req, res) {
  let tracks = [];

  for (const source of req.user.sources) {
    let search;

    if (source.name === 'Jamendo') {
      search = Jamendo.searchTracks;
    }

    tracks = tracks.concat(await search(req.params.query, source.accessToken));
  }

  // return the tracks
  res.json({ success: true, tracks });
}

module.exports = searchTracks;
