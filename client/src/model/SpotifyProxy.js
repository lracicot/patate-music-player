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
    this.clientId = '749ab993d24b4717afaeccd5308edbdc';
    this.redirectUri = 'https://www.foo.bar/oauth2/callback';
    this.authorizationUrl = 'https://accounts.spotify.com/authorize?client_id='.concat(this.clientId, '&response_type=code&redirect_uri=', this.redirectUri);
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
   * setAccessToken - Set the status to connected
   *
   * @param {string} token Access token
   *
   * @return {SpotifyProxy} Return the new connected proxy
   */
  setAccessToken(token) {
    this.accessToken = `Bearer ${token}`;
  }
}
