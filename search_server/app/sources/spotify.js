const Axios = require('axios');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

let clientId = '';
const name = 'Spotify';
const logo = 'https://developer.spotify.com/wp-content/uploads/2016/07/icon2@2x.png';


/**
 * searchTracks - Async function to get an array of tracks from keywords
 *
 * @param {string} query The searched name for the tracks
 *
 * @return {Array} An array of tracks
 */
async function searchTracks(query, token) {
  console.log(token);
  clientId = token;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: clientId,
  };

  const response = await Axios.get(`https://api.spotify.com/v1/search?type=track&q=${query}`, { headers });

  const tracks = response.data.tracks.items;
  if (tracks.length === 0) {
    return null;
  }

  const songs = [];

  tracks.forEach((track) => {
    let artworkUrl = '';
    const { images } = track.album;

    if (images.length > 0) {
      artworkUrl = images[0].url;
    }

    if (track.preview_url !== null) {
      songs.push(new Song(
        track.name,
        track.preview_url,
        artworkUrl
      ));
    }
  });

  return songs;
}

/**
 * fetchPlaylistDetails - Fetch a playlist from an playlist ID
 *
 * @param {string} playlist The playlist ID
 *
 * @return {Playlist} The playlist
 */
async function fetchPlaylistDetails(playlist) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: clientId
  };
  console.log(playlist);

  const tracksUrl = playlist.tracks.href;
  const { name } = playlist;
  const response = await Axios.get(tracksUrl, { headers });
  const songs = [];

  Object.keys(response.data.items).forEach((key) => {
    const { track } = response.data.items[key];

    let artworkUrl = '';
    const { images } = track.album;
    if (images.length > 0) {
      artworkUrl = images[0].url;
    }

    const song = new Song(
      track.name,
      track.preview_url,
      artworkUrl
    );

    if (track.preview_url !== null) {
      songs.push(song);
    }
  });

  return new Playlist(name, name, tracksUrl, logo, songs);
}

/**
 * searchPlaylists - Search a set of playlists from a query
 *
 * @param {string} query The query of the search
 *
 * @return {Array} The set of playlists
 */
async function searchPlaylists(query, token) {
  clientId = token;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: clientId,
  };

  let playlists = [];
  try {
    const response = await Axios.get(`https://api.spotify.com/v1/search?type=playlist&q=${query}`, { headers });

    const playlistsData = response.data.playlists.items;
    playlists = await Promise.all(playlistsData.map(fetchPlaylistDetails));
  } catch (e) {
    console.log(e);
  }

  return playlists;
}


module.exports.searchTracks = searchTracks;
module.exports.searchPlaylists = searchPlaylists;
