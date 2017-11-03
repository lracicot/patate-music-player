import { List } from 'immutable';

class AppendSearchResults {
  /**
   * Reduce the state
   */
  execute(state, results) {
    let searchResults = List(results);

    if (state.get('searchResults')) {
      searchResults = state.get('searchResults').merge(searchResults);
    }

    return state.set('searchResults', searchResults);
  }
}

export default new AppendSearchResults();
