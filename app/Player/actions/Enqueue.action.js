import { List } from 'immutable';

class Enqueue {
  execute(state, tracks) {
    if (tracks) {
      if (!List.isList(tracks)) {
        tracks = List.of(tracks);
      }
      return state.set('queue',
        state.get('queue').concat(tracks)
      );
    } else if (state.get('tracks').size > 0) {
      return state.set('queue',
        state.get('queue').push(state.getIn(['tracks', 0]))
      );
    }
  }
}

export default new Enqueue();
