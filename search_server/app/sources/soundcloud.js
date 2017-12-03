const Axios = require('axios');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

let clientId = '';
const name = 'SoundCloud';
const logo = 'https://developers.soundcloud.com/assets/logo_big_black-4fbe88aa0bf28767bbfc65a08c828c76.png';


/**
 * prepareUrl - Append the client id to an URL query
 *
 * @param {string} url The URL which will be appended
 *
 * @return {string} The appended URL
 */
function prepareUrl(url) {
  return `${url}?client_id=${clientId}`;
}

/**
 * searchTracks - Async function to get an array of tracks from keywords
 *
 * @param {string} keywords The searched name for the tracks
 *
 * @return {Array} An array of tracks
 */
async function searchTracks(keywords, token) {
  clientId = token;
  try {
    const response = await Axios.get(`https://api.soundcloud.com/tracks?client_id=${clientId}&q=${keywords}`);

    const tracks = response.data;
    const songs = [];

    tracks.forEach((track) => {
      if (track.sharing === 'public') {
        songs.push(new Song(
          track.title,
          prepareUrl(track.stream_url),
          track.artwork_url
        ));
      }
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
  const { tracks_uri, title, uri } = playlist;

  const response = await Axios.get(prepareUrl(tracks_uri));

  if (response.data === undefined
    || response.data.length === 0) {
    return null;
  }

  const tracks = response.data;

  const songs = tracks.map(track =>
    new Song(
      track.title,
      prepareUrl(track.stream_url),
      track.artwork_url
    ));

  return new Playlist(title, name, uri, logo, songs);
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
      Axios.get(`https://api.soundcloud.com/playlists?client_id=${clientId}&q=${query}`);

    const playlistsData = response.data;
    playlists = await Promise.all(playlistsData.map(fetchPlaylistDetails));
  } catch (e) {
    console.log(e);
  }

  return playlists;
}


module.exports.searchTracks = searchTracks;
module.exports.searchPlaylists = searchPlaylists;
