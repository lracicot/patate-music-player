/**
 * ConnectedSource - The action which set the source to connecting
 */
class ConnectingSource {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy       The proxy affected by the action
   *
   * @return {Map} The new state of the application
   */
  execute(state, proxy) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxy.name);
    const source = sources.get(sourceKey);

    sources = sources.set(sourceKey, source.setStatus('CONNECTING'));
    return state.set('sources', sources);
  }
}

export default new ConnectingSource();
