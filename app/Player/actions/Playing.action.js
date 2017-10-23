
class Playing {
  execute(state, audio_status) {
    return state.setIn(['playback', 'elapsed'], audio_status.elapsed)
      .setIn(['playback', 'total'], audio_status.total)
      .setIn(['playback', 'position'], audio_status.position);
  }
}

export default new Playing();
