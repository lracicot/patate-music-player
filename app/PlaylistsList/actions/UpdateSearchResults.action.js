import { List } from 'immutable';

/**
 * UpdateSearchResults - The action which update the search results
 */
class UpdateSearchResults {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {Array} playlists The search results
   *
   * @return {Map} The new state of the application
   */
  execute(state, playlists) {
    return state.set('playlistsFound', List(playlists));
  }
}

export default new UpdateSearchResults();
