
class Search {
  execute(state, keywords) {
    return state.set('searchQuery', keywords);
  }
}

export default new Search();
