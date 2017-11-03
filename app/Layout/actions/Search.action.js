
class Search {
  /**
   * Reduce the state
   */
  execute(state, keywords) {
    return state.set('searchQuery', keywords);
  }
}

export default new Search();
