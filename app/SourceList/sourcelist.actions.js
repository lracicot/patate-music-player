import Axios from 'axios';
import { Mutex } from 'await-semaphore';

async function fetchAuthorizationCode(source) {
  let resultUrl = null;

  const { remote } = window.require('electron');
  const { BrowserWindow } = remote;

  const mutex = new Mutex();
  await mutex.acquire();
  // Result = null

  let authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    'node-integration': false,
    'web-security': false,
  });
  authWindow.loadURL(source.authorizationUrl);
  authWindow.show();
  // 'will-navigate' is an event emitted when the window.location changes
  // newUrl should contain the tokens you need
  authWindow.webContents.on('will-navigate', (event, newUrl) => {
    if (newUrl.startsWith(source.redirectUri)) {
      resultUrl = newUrl;
      authWindow.close();
    }
  });

  authWindow.on('closed', () => {
    authWindow = null;

    release();
  });

  await mutex.acquire();
  return resultUrl;
}

async function fetchTokenCode(source, strUrl) {
  // const index = url.search('code=');
  const url = new URL(strUrl);
  const code = url.searchParams.get('code');
  const tokenUri = source.getToken(code);
  console.log(tokenUri);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: source.authorizationHeader,
  };

  const response = await Axios.post(tokenUri, null, { headers });
  return response.data.access_token;
}

// DO NOT PUT IN DEFAULT OR IT WON'T WORK
export const CONNECT_SOURCE = 'CONNECTSOURCE';
export function connectSource(proxy) {
  return (dispatch) => {
    console.log(dispatch);
    // dispatch(START_CONNECTION);
    return fetchAuthorizationCode(proxy)
      .then(response => fetchTokenCode(proxy, response))
      .then(response => console.log(response) /* dispatch connection completed */);
    // On error dispatch connexion failed
  };

  /*
  return {
    type: CONNECT_SOURCE,
    proxyName,
  };
  */
}
