import { List } from 'immutable';

class ClearSearchResults {
  /**
   * Reduce the state
   */
  execute(state) {
    return state.set('searchResults', List());
  }
}

export default new ClearSearchResults();
