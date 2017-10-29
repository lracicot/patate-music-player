class ConnectSource {
  execute(state, proxy, connectionStatus) {
    /*
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxyName);
    const source = sources.get(sourceKey);
    // console.log(source.setStatus('CONNECTED'));

    sources = sources.set(sourceKey, source.setStatus('CONNECTED'));

    if (source.authorizationUrl !== null) {
      this.test(source, source.authorizationUrl, this.onAuthorizationCompleted);
      /*
      Axios.get(source.authorizationUrl).then(response => {

        console.log(response);
      })

    }
    */

    // TODO:: Change proxy status to connection
    console.log(proxy);
    console.log(connectionStatus);
    return state;
    // return state.set('sources', sources);
  }
}

export default new ConnectSource();
