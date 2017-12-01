import { autobind } from 'core-decorators';
import Axios from 'axios';

import Song from './Song';

import Playlist from './Playlist';

const clientId = '58c2e328';

/**
  * JamendoProxy - Proxy interface to Jamendo API (This class is immutable)
  */
export default class JamendoProxy {
  /**
   * constructor - Construct the proxy
   *
   * @return {JamendoProxy} Returns the proxy
   */
  constructor() {
    this.name = 'Jamendo';
    this.logo = 'http://www.userlogos.org/files/logos/43932_aleksandr009/jamendo_1_1.png';
    this.status = 'DISCONNECTED';
    this.authorizationUrl = null;
  }

  /**
   * setStatus - Change the status of the proxy to a new state
   *
   * @param {string} status The new status
   *
   * @return {JamendoProxy} The new proxy with the new status
   */
  setStatus(status) {
    const proxy = new JamendoProxy();
    proxy.status = status;
    this.accessToken = null;
    return proxy;
  }

  getAccessToken() {
    return clientId;
  }

  /**
   * setAccessToken - Set the status to connected
   *
   * @return {JamendoProxy} Return the new connected proxy
   */
  setAccessToken() {
    const proxy = new JamendoProxy();
    proxy.status = 'CONNECTED';
    return proxy;
  }

  /**
   * needsAuthentification - Jamendo does not need a authentifation process
   *
   * @return {boolean} false
   */
  needsAuthentification() {
    return false;
  }

  /**
   * isConnected - Check if the proxy is connected
   *
   * @return {boolean} Is proxy connected
   */
  isConnected() {
    return this.status === 'CONNECTED';
  }

  /**
   * prepareUrl - Append the client id to an URL query
   *
   * @param {string} url The URL which will be appended
   *
   * @return {string} The appended URL
   */
  prepareUrl(url) {
    return `${url}?client_id=${clientId}`;
  }

  /**
   * searchTracks - Async function to get an array of tracks from keywords
   *
   * @param {string} keywords The searched name for the tracks
   *
   * @return {Array} An array of tracks
   */
  async searchTracks(keywords) {
    try {
      const response = await
        Axios.get(`https://api.jamendo.com/v3.0/tracks/?namesearch=${keywords}&client_id=${clientId}&format=jsonpretty&limit=200`);

      const tracks = response.data.results;

      if (tracks.length === 0) {
        return null;
      }

      const songs = [];

      tracks.forEach((track) => {
        songs.push(new Song(
          track.name,
          track.audio,
          track.album_image,
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
  @autobind
  async fetchPlaylistDetails(playlist) {
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
      return new Song(
        track.name,
        track.audio,
        track.album_image,
      );
    });

    return new Playlist(name, this.name, zip, this.logo, songs);
  }

  /**
   * searchPlaylists - Search a set of playlists from a query
   *
   * @param {string} query The query of the search
   *
   * @return {Array} The set of playlists
   */
  async searchPlaylists(query) {
    let playlists = [];
    try {
      const response = await
        Axios.get(`https://api.jamendo.com/v3.0/playlists/?client_id=${clientId}&format=jsonpretty&limit=10&namesearch=${query}&track_type=albumtrack`);

      const playlistsData = response.data.results;
      playlists = await Promise.all(playlistsData.map(this.fetchPlaylistDetails));
    } catch (e) {
      console.log(e);
    }

    return playlists;
  }
}
