/**
 * Search - The action which search musics
 */
class Search {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {string} keywords       The keywords to search
   *
   * @return {Map} The new state of the application
   */
  execute(state, keywords) {
    return state.set('searchQuery', keywords);
  }
}

export default new Search();
