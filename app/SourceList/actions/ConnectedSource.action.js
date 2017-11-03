
/**
 * ConnectedSource - The action which connect the source
 */
class ConnectedSource {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy       The proxy affected by the action
   * @param {string} accessToken The access token
   *
   * @return {Map} The new state of the application
   */
  execute(state, proxy, accessToken) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxy.name);
    const source = sources.get(sourceKey);

    sources = sources.set(sourceKey, source.setAccessToken(accessToken));
    return state.set('sources', sources);
  }
}

export default new ConnectedSource();
