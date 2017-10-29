import { List } from 'immutable';

class Enqueue {
  execute(state, tracks) {
    if (tracks) {
      let localTracks = tracks;
      if (!List.isList(localTracks)) {
        localTracks = List.of(localTracks);
      }
      return state.set(
        'queue',
        state.get('queue').concat(localTracks),
      );
    } else if (state.get('tracks').size > 0) {
      return state.set(
        'queue',
        state.get('queue').push(state.getIn(['tracks', 0])),
      );
    }

    return null;
  }
}

export default new Enqueue();
