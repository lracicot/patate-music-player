import Axios from 'axios';
import Semaphore from 'semaphore-async-await';

export async function fetchAuthorizationCode(source) {
  let resultUrl = null;

  const { remote } = window.require('electron');
  const { BrowserWindow } = remote;

  const mutex = new Semaphore(0);

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

    mutex.signal();
  });

  await mutex.wait();
  return resultUrl;
}

export async function fetchTokenCode(source, strUrl) {
  // const index = url.search('code=');
  const url = new URL(strUrl);
  const code = url.searchParams.get('code');
  const tokenUri = source.getToken(code);
  console.log(tokenUri);

  const { requestConfig } = source;

  const response = await Axios.post(tokenUri, null, requestConfig);
  return response.data.access_token;
}
