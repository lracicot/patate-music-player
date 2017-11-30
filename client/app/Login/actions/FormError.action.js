
/**
 * FormError - The action which set the error
 */
class FormError {
  /**
   * execute - Execute the action
   *
   * @param {Map} state The old state of the application
   * @param {string} error The error string
   * @return {Map} The new state of the application
   */
  execute(state, error) {
    return state.set('form_error', error);
  }
}

export default new FormError();
