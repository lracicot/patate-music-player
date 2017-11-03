
class EndSearch {
  /**
   * Reduce the state
   */
  execute(state) {
    return state.set('searchQuery', '');
  }
}

export default new EndSearch();
