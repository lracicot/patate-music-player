const Jamendo = require('../sources/jamendo');


async function searchPlaylist(req, res) {
  let playlists = [];

  for (const source of req.user.sources) {
    let search;

    if (source.name === 'Jamendo') {
      search = Jamendo.searchPlaylists;
    }

    playlists = playlists.concat(await search(req.params.query, source.accessToken));
  }

  // return the playlists
  res.json({ success: true, playlists });
}

module.exports = searchPlaylist;
