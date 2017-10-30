// Axios for Ajax
// import Axios from 'axios';

// import Song from './Song';

const clientId = '749ab993d24b4717afaeccd5308edbdc';

export default class SpotifyProxy {
  constructor() {
    this.name = 'Spotify';
    this.logo = 'https://developer.spotify.com/wp-content/uploads/2016/07/icon2@2x.png';
    this.status = 'DISCONNECTED';
    this.redirectUri = 'https://www.foo.bar/oauth2/callback';
    this.authorizationHeader = 'Basic NzQ5YWI5OTNkMjRiNDcxN2FmYWVjY2Q1MzA4ZWRiZGM6NGI0MzVlNzIxYzNjNDcwY2FmODI4MjEzNTQwMjFjZjk=';
    this.authorizationUrl = 'https://accounts.spotify.com/authorize?client_id='.concat(clientId, '&response_type=code&redirect_uri=', this.redirectUri);
    this.accessToken = null;
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
    proxy.accessToken = token;
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
    return this.search('pop');
  }

  async search() {
    return null;
  }
}
