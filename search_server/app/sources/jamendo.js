const Axios = require('axios');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

let clientId = '';

/**
 * searchTracks - Async function to get an array of tracks from keywords
 *
 * @param {string} keywords The searched name for the tracks
 *
 * @return {Array} An array of tracks
 */
async function searchTracks(keywords, clientId) {
  try {
    const response = await
      Axios.get(`https://api.jamendo.com/v3.0/tracks/?namesearch=${keywords}&client_id=${clientId}&format=jsonpretty&limit=200`);

    const tracks = response.data.results;

    if (tracks.length === 0) {
      return null;
    }

    const songs = [];

    tracks.forEach((track) => {
      songs.push(Song(
        track.name,
        track.audio,
        track.album_image
      ));
    });

    return songs;
  } catch (e) {
    console.log(e);
  }

  return null;
}

/**
 * fetchPlaylistDetails - Fetch a playlist from an playlist ID
 *
 * @param {string} playlist The playlist ID
 *
 * @return {Playlist} The playlist
 */
async function fetchPlaylistDetails(playlist) {
  const { id } = playlist;

  const response = await Axios.get(`https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${clientId}&format=jsonpretty&limit=200&id=${id}&track_type=albumtrack`);

  if (response.data.results === undefined
    || response.data.results.length === 0) {
    return null;
  }

  const playlistData = response.data.results[0];
  const { tracks, zip, name } = playlistData;

  const songs = Object.keys(tracks).map((key) => {
    const track = tracks[key];
    return Song(
      track.name,
      track.audio,
      track.album_image
    );
  });

  return Playlist(name, this.name, zip, this.logo, songs);
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
  let playlists = [];
  try {
    const response = await
      Axios.get(`https://api.jamendo.com/v3.0/playlists/?client_id=${clientId}&format=jsonpretty&limit=10&namesearch=${query}&track_type=albumtrack`);

    const playlistsData = response.data.results;
    playlists = await Promise.all(playlistsData.map(fetchPlaylistDetails));
  } catch (e) {
    console.log(e);
  }

  return playlists;
}


module.exports.searchTracks = searchTracks;
module.exports.searchPlaylists = searchPlaylists;
