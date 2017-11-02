import { autobind } from 'core-decorators';
import Axios from 'axios';

import Playlist from './Playlist';
import Song from './Song';

const clientId = '2f98992c40b8edf17423d93bda2e04ab';

export default class SoundCloudProxy {
  constructor() {
    this.name = 'SoundCloud';
    this.logo = 'https://developers.soundcloud.com/assets/logo_big_black-4fbe88aa0bf28767bbfc65a08c828c76.png';
    this.status = 'DISCONNECTED';
    this.authorizationUrl = null;
  }

  setStatus(status) {
    const proxy = new SoundCloudProxy();
    proxy.status = status;
    return proxy;
  }

  setAccessToken() {
    const proxy = new SoundCloudProxy();
    proxy.status = 'CONNECTED';
    return proxy;
  }

  needsAuthentification() {
    return false;
  }

  isConnected() {
    return this.status === 'CONNECTED';
  }

  prepareUrl(url) {
    return `${url}?client_id=${clientId}`;
  }

  async loadRandomPlaylist() {
    return this.searchPlaylists('pop');
  }

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
