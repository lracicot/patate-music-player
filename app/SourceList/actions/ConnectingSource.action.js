class ConnectingSource {
  execute(state, proxy) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxy.name);
    const source = sources.get(sourceKey);

    sources = sources.set(sourceKey, source.setStatus('CONNECTING'));
    return state.set('sources', sources);
  }
}

export default new ConnectingSource();
