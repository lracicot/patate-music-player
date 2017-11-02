// Axios for Ajax
import Axios from 'axios';

import Song from './Song';

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

  async loadRandomPlaylist() {
    return this.search('pop');
  }

  async search(query) {
    try {
      const response = await
        Axios.get(`https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${clientId}&format=jsonpretty&limit=200&name=${query}&track_type=albumtrack`);

      const playlists = response.data.results;
      if (playlists.length === 0) {
        return null;
      }

      const songs = [];

      const { tracks } = playlists[0];

      Object.keys(tracks).forEach((key) => {
        const track = tracks[key];
        const song = new Song(
          track.name,
          track.audio,
          track.album_image,
        );
        songs.push(song);
      });

      return songs;
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
