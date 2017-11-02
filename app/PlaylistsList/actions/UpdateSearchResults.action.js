import { List } from 'immutable';

class UpdateSearchField {
  execute(state, playlists) {
    return state.set('playlistsFound', List(playlists));
  }
}

export default new UpdateSearchField();
