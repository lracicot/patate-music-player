
/**
 * Playing - The action which update the music playing
 */
class Playing {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {object} audioStatus  Data structure holding the status
   *
   * @return {Map} The new state of the application
   */
  execute(state, audioStatus) {
    return state.setIn(['playback', 'elapsed'], audioStatus.elapsed)
      .setIn(['playback', 'total'], audioStatus.total)
      .setIn(['playback', 'position'], audioStatus.position);
  }
}

export default new Playing();
