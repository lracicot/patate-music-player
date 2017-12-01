
/**
 * ConnectedSource - The action which connect the source
 */
class ConnectedSource {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {object} source The source to add
   *
   * @return {Map} The new state of the application
   */
  execute(state, source) {
    if (state.get('connectedSources')
      .find(s => s.id === source.id || s._id === source._id)) {
      return state;
    }

    return state.set(
      'connectedSources',
      state.get('connectedSources').push(source),
    );
  }
}

export default new ConnectedSource();
