
/**
 * EndSearch - The action which end the search
 */
class EndSearch {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    return state.set('searchQuery', '');
  }
}

export default new EndSearch();
