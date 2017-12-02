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
async searchTracks(keywords, clientId) {
  try {
    const response = await Axios.get(`https://api.soundcloud.com/tracks?client_id=${clientId}&q=${keywords}`);

    const tracks = response.data;
    const songs = [];

    tracks.forEach((track) => {
      if (track.sharing === 'public') {
        songs.push(new Song(
          track.title,
          this.prepareUrl(track.stream_url),
          track.artwork_url,
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
async fetchPlaylistDetails(playlist) {
  const { tracks_uri, title, uri } = playlist;

  const response = await Axios.get(this.prepareUrl(tracks_uri));

  if (response.data === undefined
    || response.data.length === 0) {
    return null;
  }

  const tracks = response.data;

  const songs = tracks.map(track =>
    new Song(
      track.title,
      this.prepareUrl(track.stream_url),
      track.artwork_url,
    ));

  return new Playlist(title, this.name, uri, this.logo, songs);
}

/**
 * searchPlaylists - Search a set of playlists from a query
 *
 * @param {string} query The query of the search
 *
 * @return {Array} The set of playlists
 */
async searchPlaylists(query, token) {
  clientId = token;
  let playlists = [];
  try {
    const response = await
      Axios.get(`https://api.soundcloud.com/playlists?client_id=${clientId}&q=${query}`);

    const playlistsData = response.data;
    playlists = await Promise.all(playlistsData.map(this.fetchPlaylistDetails));
  } catch (e) {
    console.log(e);
  }

  return playlists;
}


module.exports.searchTracks = searchTracks;
module.exports.searchPlaylists = searchPlaylists;
