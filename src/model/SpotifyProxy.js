import { autobind } from 'core-decorators';
import Axios from 'axios';

import Playlist from './Playlist';
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

  async loadRandomPlaylist() {
    return this.searchPlaylists('pop');
  }

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

  async oldSearch(query) {
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
