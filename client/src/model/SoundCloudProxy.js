import { autobind } from 'core-decorators';
import Axios from 'axios';

import Playlist from './Playlist';
import Song from './Song';

const clientId = '2f98992c40b8edf17423d93bda2e04ab';

/**
  * SoundCloudProxy - Proxy interface to SoundCloud API (This class is immutable)
  */
export default class SoundCloudProxy {
  constructor() {
    this.name = 'SoundCloud';
    this.logo = 'https://developers.soundcloud.com/assets/logo_big_black-4fbe88aa0bf28767bbfc65a08c828c76.png';
    this.status = 'DISCONNECTED';
    this.authorizationUrl = null;
  }

  /**
   * setStatus - Change the status of the proxy to a new state
   *
   * @param {string} status The new status
   *
   * @return {SoundCloudProxy} The new proxy with the new status
   */
  setStatus(status) {
    const proxy = new SoundCloudProxy();
    proxy.status = status;
    return proxy;
  }

  /**
   * setAccessToken - Set the status to connected
   *
   * @return {SoundCloudProxy} Return the new connected proxy
   */
  setAccessToken() {
    const proxy = new SoundCloudProxy();
    proxy.status = 'CONNECTED';
    return proxy;
  }

  /**
   * needsAuthentification - SoundCloud does not need a authentifation process
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
  @autobind
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
  async searchPlaylists(query) {
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
}
