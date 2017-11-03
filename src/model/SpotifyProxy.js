// Axios for Ajax
import Axios from 'axios';

import Song from './Song';

const clientId = '749ab993d24b4717afaeccd5308edbdc';

export default class SpotifyProxy {
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

  getToken(code) {
    return 'https://accounts.spotify.com/api/token?grant_type=authorization_code&code='.concat(code, '&redirect_uri=', this.redirectUri);
  }

  setStatus(status) {
    const proxy = new SpotifyProxy();
    proxy.status = status;
    this.accessToken = null;
    return proxy;
  }

  setAccessToken(token) {
    const proxy = new SpotifyProxy();
    proxy.accessToken = `Bearer ${token}`;
    proxy.status = 'CONNECTED';
    return proxy;
  }

  needsAuthentification() {
    return true;
  }

  isConnected() {
    return this.status === 'CONNECTED';
  }

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

      console.log(track.preview_url);

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

  async loadRandomPlaylist() {
    return this.search('pop');
  }

  async search(query) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.accessToken,
    };

    let response = await Axios.get(`https://api.spotify.com/v1/search?type=playlist&q=${query}`, { headers });

    const playlists = response.data.playlists.items;
    if (playlists.length === 0) {
      return null;
    }

    const tracksUrl = playlists[0].tracks.href;

    response = await Axios.get(tracksUrl, { headers });
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

    return songs;
  }
}
