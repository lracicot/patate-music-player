class ConnectedSource {
  execute(state, proxy, accessToken) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxy.name);
    const source = sources.get(sourceKey);

    sources = sources.set(sourceKey, source.setAccessToken(accessToken));
    return state.set('sources', sources);
  }
}

export default new ConnectedSource();
