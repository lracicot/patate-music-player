import { autobind } from 'core-decorators';
import Axios from 'axios';

import Song from './Song';

import Playlist from './Playlist';

const clientId = '58c2e328';

export default class JamendoProxy {
  constructor() {
    this.name = 'Jamendo';
    this.logo = 'http://www.userlogos.org/files/logos/43932_aleksandr009/jamendo_1_1.png';
    this.status = 'DISCONNECTED';
    this.authorizationUrl = null;
  }

  setStatus(status) {
    const proxy = new JamendoProxy();
    proxy.status = status;
    this.accessToken = null;
    return proxy;
  }

  setAccessToken() {
    const proxy = new JamendoProxy();
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
    return this.searchPlaylists('pop').get(0);
  }

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
