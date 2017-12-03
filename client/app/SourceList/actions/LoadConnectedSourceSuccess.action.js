import { List } from 'immutable';

/**
 * LoadConnectedSourceSuccess
 */
class LoadConnectedSourceSuccess {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {object} sources The sources to add
   *
   * @return {Map} The new state of the application
   */
  execute(state, sources) {
    return state.set(
      'connectedSources',
      List(sources),
    );
  }
}

export default new LoadConnectedSourceSuccess();
