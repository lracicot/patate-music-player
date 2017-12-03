import Sound from 'react-sound';

/**
 * Play - The action which play the music
 */
class Play {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    if (state.get('queue').size > 0) {
      return state.setIn(['playback', 'playStatus'], Sound.status.PLAYING);
    }

    return state;
  }
}

export default new Play();
