
/**
 * ConnectedSource - The action which update the search field
 */
class UpdateSearchField {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {string} searchValue The search value
   *
   * @return {Map} The new state of the application
   */
  execute(state, searchValue) {
    return state.set('playlistSearch', searchValue);
  }
}

export default new UpdateSearchField();
