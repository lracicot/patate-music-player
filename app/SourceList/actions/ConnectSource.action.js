// import { enqueue } from './../../Player/player.actions';

class ConnectSource {
  execute(state, proxyName) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxyName);
    const source = sources.get(sourceKey);
    // console.log(source.setStatus('CONNECTED'));

    sources = sources.set(sourceKey, source.setStatus('CONNECTED'));

    // TODO:: Je ne sais pas comment faire
    /*
    source.loadRandomPlaylist().then(tracks => {
      dispatch(enqueue(List(tracks)));
    });
    */

    return state.set('sources', sources);
  }
}

export default new ConnectSource();
