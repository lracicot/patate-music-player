import Sound from 'react-sound';

/**
 * TogglePlay - The action which toggle the music
 */
class TogglePlay {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    if (state.get('queue').size > 0) {
      if (state.getIn(['playback', 'playStatus']) === Sound.status.PLAYING) {
        return state.setIn(['playback', 'playStatus'], Sound.status.PAUSED);
      }
      return state.setIn(['playback', 'playStatus'], Sound.status.PLAYING);
    }

    return state;
  }
}

export default new TogglePlay();
