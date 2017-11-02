
class Search {
  execute(state, keywords) {
    return state.set('search', keywords);
  }
}

export default new Search();
