
/**
 * SetState - This classe represent an action to replace the whole
 * application state with a new one.
 */
class SetState {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {Map} newState       The new state of the application
   *
   * @return {Map} The merged state of the application
   */
  execute(state, newState) {
    return state.merge(newState);
  }
}

export default new SetState();
