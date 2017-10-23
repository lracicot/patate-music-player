
class SetState {
  execute(state, newState) {
    return state.merge(newState);
  }
}

export default new SetState();
