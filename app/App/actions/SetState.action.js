
/**
 * This classe represent an action to replace the whole
 * application state with a new one.
 */
class SetState {
  /**
   * Reduce the state
   */
  execute(state, newState) {
    return state.merge(newState);
  }
}

export default new SetState();
