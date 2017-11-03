import { List } from 'immutable';

/**
 * ClearQueue - The action which clear the queue
 */
class ClearQueue {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    return state.set('queue', List());
  }
}

export default new ClearQueue();
