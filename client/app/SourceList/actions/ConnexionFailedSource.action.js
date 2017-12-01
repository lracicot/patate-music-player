/**
 * ConnexionFailedSource - The action which set the source to connexion failed
 */
class ConnexionFailedSource {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   * @param {string} error The failure message
   *
   * @return {Map} The new state of the application
   */
  execute(state) {
    return state;
  }
}

export default new ConnexionFailedSource();
