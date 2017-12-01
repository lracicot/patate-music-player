import { autobind } from 'core-decorators';
import Axios from 'axios';

import Playlist from './Playlist';
import Song from './Song';

const clientId = '749ab993d24b4717afaeccd5308edbdc';

/**
  * SpotifyProxy - Proxy interface to Jamendo API (This class is immutable)
  */
export default class SpotifyProxy {
  /**
   * constructor - Construct the proxy
   *
   * @return {SpotifyProxy} Returns the proxy
   */
  constructor() {
    this.name = 'Spotify';
    this.logo = 'https://developer.spotify.com/wp-content/uploads/2016/07/icon2@2x.png';
    this.status = 'DISCONNECTED';
    this.redirectUri = 'https://www.foo.bar/oauth2/callback';
    this.authorizationUrl = 'https://accounts.spotify.com/authorize?client_id='.concat(clientId, '&response_type=code&redirect_uri=', this.redirectUri);
    this.accessToken = null;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic NzQ5YWI5OTNkMjRiNDcxN2FmYWVjY2Q1MzA4ZWRiZGM6NGI0MzVlNzIxYzNjNDcwY2FmODI4MjEzNTQwMjFjZjk=',
    };

    this.requestConfig = { headers };
  }

  /**
   * getToken - Get the url to ask access token
   *
   * @param {string} code Authorization code
   *
   * @return {string} URL for get access token
   */
  getToken(code) {
    return 'https://accounts.spotify.com/api/token?grant_type=authorization_code&code='.concat(code, '&redirect_uri=', this.redirectUri);
  }

  /**
   * setStatus - Change the status of the proxy to a new state
   *
   * @param {string} status The new status
   *
   * @return {SpotifyProxy} The new proxy with the new status
   */
  setStatus(status) {
    const proxy = new SpotifyProxy();
    proxy.status = status;
    this.accessToken = null;
    return proxy;
  }

  /**
   * setAccessToken - Set the status to connected
   *
   * @param {string} token Access token
   *
   * @return {SpotifyProxy} Return the new connected proxy
   */
  setAccessToken(token) {
    const proxy = new SpotifyProxy();
    proxy.accessToken = `Bearer ${token}`;
    proxy.status = 'CONNECTED';
    return proxy;
  }

  getAccessToken() {
    return JSON.stringify({ accessToken: this.accessToken, clientId });
  }

  /**
   * needsAuthentification - Spotify need an authentifation process
   *
   * @return {boolean} true
   */
  needsAuthentification() {
    return true;
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
   * searchTracks - Async function to get an array of tracks from keywords
   *
   * @param {string} query The searched name for the tracks
   *
   * @return {Array} An array of tracks
   */
  async searchTracks(query) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.accessToken,
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
          artworkUrl,
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
  @autobind
  async fetchPlaylistDetails(playlist) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.accessToken,
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
        artworkUrl,
      );

      if (track.preview_url !== null) {
        songs.push(song);
      }
    });

    return new Playlist(name, this.name, tracksUrl, this.logo, songs);
  }

  /**
   * searchPlaylists - Search a set of playlists from a query
   *
   * @param {string} query The query of the search
   *
   * @return {Array} The set of playlists
   */
  async searchPlaylists(query) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.accessToken,
    };

    let playlists = [];
    try {
      const response = await Axios.get(`https://api.spotify.com/v1/search?type=playlist&q=${query}`, { headers });

      const playlistsData = response.data.playlists.items;
      playlists = await Promise.all(playlistsData.map(this.fetchPlaylistDetails));
    } catch (e) {
      console.log(e);
    }

    return playlists;
  }
}
