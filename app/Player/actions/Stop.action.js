import Sound from 'react-sound';

/**
 * Stop - The action which stop the music
 */
class Stop {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    return state.setIn(['playback', 'playStatus'], Sound.status.STOPPED);
  }
}

export default new Stop();
