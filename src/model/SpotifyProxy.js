// Axios for Ajax
// import Axios from 'axios';

// import Song from './Song';

export default class SpotifyProxy {
  constructor() {
    this.name = 'Spotify';
    this.logo = 'https://developer.spotify.com/wp-content/uploads/2016/07/icon2@2x.png';
    this.status = 'DISCONNECTED';
  }

  setStatus(status) {
    const proxy = new SpotifyProxy();
    proxy.status = status;
    return proxy;
  }

  async loadRandomPlaylist() {
    return this.search('');
  }

  async search() {
    return null;
  }
}
