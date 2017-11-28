/**
 * ConnexionFailedSource - The action which set the source to connexion failed
 */
class ConnexionFailedSource {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy       The proxy affected by the action
   * @param {string} error The failure message
   *
   * @return {Map} The new state of the application
   */
  execute(state, proxy, error) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxy.name);
    const source = sources.get(sourceKey);

    console.log(error);
    sources = sources.set(sourceKey, source.setStatus('DISCONNECTED'));
    return state.set('sources', sources);
  }
}

export default new ConnexionFailedSource();
