import { List } from 'immutable';

/**
 * AppendSearchResults - The action which append the results
 */
class AppendSearchResults {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {Array} results       The array of results to merge
   *
   * @return {Map} The new state of the application
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
