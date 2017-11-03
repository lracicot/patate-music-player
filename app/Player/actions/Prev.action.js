
/**
 * Prev - The action which back the music
 */
class Prev {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    if (state.get('history').size > 0) {
      const prevTrack = state.get('history').peek();

      return state.set('history',
        state.get('history').shift()).set('queue',
        state.get('queue').insert(0, prevTrack));
    }

    return state;
  }
}

export default new Prev();
