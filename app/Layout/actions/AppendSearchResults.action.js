import { List } from 'immutable';

class AppendSearchResults {
  execute(state, results) {
    return state.set('searchResults', state.get('searchResults').merge(List(results)));
  }
}

export default new AppendSearchResults();
