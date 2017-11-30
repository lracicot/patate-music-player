
/**
 * Login - The action which connect the user
 */
class Login {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {string} accessToken The access token
   * @return {Map} The new state of the application
   */
  execute(state, accessToken) {
    return state.set('accessToken', accessToken);
  }
}

export default new Login();
