/**
  * JamendoProxy - Proxy interface to Jamendo API (This class is immutable)
  */
export default class JamendoProxy {
  /**
   * constructor - Construct the proxy
   *
   * @return {JamendoProxy} Returns the proxy
   */
  constructor() {
    this.name = 'Jamendo';
    this.accessToken = '58c2e328';
    this.authorizationUrl = null;
  }
}
