import { fetchAuthorizationCode, fetchTokenCode } from './actions/Connexion.helper';

export const CONNECTING_SOURCE = 'CONNECTINGSOURCE';

/**
 * connectingSource - Creates an action named "CONNECTINGSOURCE" with
 * the required data to execute the reducer action
 *
 * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy The proxy affected by the action
 *
 * @return {ActionCreator} The action creator
 */
function connectingSource(proxy) {
  return {
    type: CONNECTING_SOURCE,
    proxy,
  };
}

export const CONNECTED_SOURCE = 'CONNECTEDSOURCE';

/**
 * connectedSource - Creates an action named "CONNECTEDSOURCE" with
 * the required data to execute the reducer action
 *
 * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy The proxy affected by the action
 * @param {string} accessToken The access token
 *
 * @return {ActionCreator} The action creator
 */
function connectedSource(proxy, accessToken) {
  return {
    type: CONNECTED_SOURCE,
    proxy,
    accessToken,
  };
}

export const CONNEXION_FAILED_SOURCE = 'CONNEXIONFAILEDSOURCE';
/**
 * connexionFailedSource - Creates an action named "CONNEXIONFAILEDSOURCE" with
 * the required data to execute the reducer action
 *
 * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy The proxy affected by the action
 * @param {string} error The reason of the failure
 *
 * @return {ActionCreator} The action creator
 */
function connexionFailedSource(proxy, error) {
  return {
    type: CONNEXION_FAILED_SOURCE,
    proxy,
    error,
  };
}

/**
 * toggleSourceConnexion - Toggle the connexion of a source and dispatch the correct actions
 *
 * @param {JamendoProxy|SpotifyProxy|SoundCloudProxy} proxy The proxy affected by the action
 *
 * @return {Promise} The promise to wait this action
 */
export function toggleSourceConnexion(proxy) {
  return async (dispatch) => {
    if (proxy.isConnected()) {
      return dispatch(connexionFailedSource(proxy, null));
    }

    if (proxy.needsAuthentification()) {
      dispatch(connectingSource(proxy));

      try {
        const authCode = await fetchAuthorizationCode(proxy);
        const accessToken = await fetchTokenCode(proxy, authCode);

        return dispatch(connectedSource(proxy, accessToken));
      } catch (error) {
        return dispatch(connexionFailedSource(proxy, error));
      }
    }

    return dispatch(connectedSource(proxy, null));
  };
}
