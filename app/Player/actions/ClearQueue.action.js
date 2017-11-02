import { List } from 'immutable';

class ClearQueue {
  execute(state) {
    return state.set('queue', List());
  }
}

export default new ClearQueue();
