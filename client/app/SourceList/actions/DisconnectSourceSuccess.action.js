
/**
 * DisconnectSourceSuccess - The action which connect the source
 */
class DisconnectSourceSuccess {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {object} name The name of the source to remove
   *
   * @return {Map} The new state of the application
   */
  execute(state, name) {
    return state.set('connectedSources',
      state.get('connectedSources').filter(source =>
        source.name === name));
  }
}

export default new DisconnectSourceSuccess();
