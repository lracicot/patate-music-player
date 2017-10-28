
class Playing {
  execute(state, audioStatus) {
    return state.setIn(['playback', 'elapsed'], audioStatus.elapsed)
      .setIn(['playback', 'total'], audioStatus.total)
      .setIn(['playback', 'position'], audioStatus.position);
  }
}

export default new Playing();
