import { List } from 'immutable';

/**
 * EndSearch - The action which clear the search results
 */
class ClearSearchResults {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    return state.set('searchResults', List());
  }
}

export default new ClearSearchResults();
