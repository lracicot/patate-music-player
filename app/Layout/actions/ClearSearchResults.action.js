import { List } from 'immutable';

class ClearSearchResults {
  execute(state) {
    return state.set('searchResults', List());
  }
}

export default new ClearSearchResults();
