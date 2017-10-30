class ConnexionFailedSource {
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
