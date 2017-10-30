import { fetchAuthorizationCode, fetchTokenCode } from './actions/Connexion.helper';

export const CONNECTING_SOURCE = 'CONNECTINGSOURCE';
function connectingSource(proxy) {
  return {
    type: CONNECTING_SOURCE,
    proxy,
  };
}

export const CONNECTED_SOURCE = 'CONNECTEDSOURCE';
function connectedSource(proxy, accessToken) {
  return {
    type: CONNECTED_SOURCE,
    proxy,
    accessToken,
  };
}

export const CONNEXION_FAILED_SOURCE = 'CONNEXIONFAILEDSOURCE';
function connexionFailedSource(proxy, error) {
  return {
    type: CONNEXION_FAILED_SOURCE,
    proxy,
    error,
  };
}

export function toggleSourceConnexion(proxy) {
  return (dispatch) => {
    if (proxy.isConnected()) {
      return dispatch(connexionFailedSource(proxy, null));
    }


    if (proxy.needsAuthentification()) {
      dispatch(connectingSource(proxy));
      return fetchAuthorizationCode(proxy)
        .then(authCode => fetchTokenCode(proxy, authCode))
        .then(accessToken => dispatch(connectedSource(proxy, accessToken)))
        .catch(error => dispatch(connexionFailedSource(proxy, error)));
    }

    return dispatch(connectedSource(proxy, null));
  };
}
