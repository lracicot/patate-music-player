import { List } from 'immutable';

class ClearQueue {
  /**
   * Reduce the state
   */
  execute(state) {
    return state.set('queue', List());
  }
}

export default new ClearQueue();
