// import { enqueue } from './../../Player/player.actions';
import Axios from 'axios';

/*
const electron = window.require('electron').remote;

require('electron-reload')(__dirname);
require('babel-polyfill');

// Module to control application life.
const { app } = electron.app;

// Module to create native browser window.
const { BrowserWindow } = electron.BrowserWindow;
*/

class ConnectSource {
  test(source, authUrl, authCompleted) {
    const { remote } = window.require('electron');
    const { BrowserWindow } = remote;

    let authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      'node-integration': false,
      'web-security': false,
    });
    authWindow.loadURL(authUrl);
    authWindow.show();
    // 'will-navigate' is an event emitted when the window.location changes
    // newUrl should contain the tokens you need
    authWindow.webContents.on('will-navigate', (event, newUrl) => {
      if (newUrl.startsWith('https://www.foo.bar/oauth2/callback')) {
        authCompleted(source, newUrl);
        authWindow.close();
      }
    });

    authWindow.on('closed', () => {
      authWindow = null;
    });
  }

  onAuthorizationCompleted(source, strUrl) {
    // const index = url.search('code=');
    const url = new URL(strUrl);
    const code = url.searchParams.get('code');
    const tokenUri = source.getToken(code);
    console.log(tokenUri);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: source.authorizationHeader,
    };

    Axios.post(tokenUri, null, { headers })
      .then((response) => {
        console.log(response.data.access_token);
        dispatch('foo');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  execute(state, proxyName) {
    let sources = state.get('sources');
    const sourceKey = sources.findKey(value => value.name === proxyName);
    const source = sources.get(sourceKey);
    // console.log(source.setStatus('CONNECTED'));

    sources = sources.set(sourceKey, source.setStatus('CONNECTED'));

    if (source.authorizationUrl !== null) {
      this.test(source, source.authorizationUrl, this.onAuthorizationCompleted);
      /*
      Axios.get(source.authorizationUrl).then(response => {

        console.log(response);
      })
      */
    }

    return state.set('sources', sources);
  }
}

export default new ConnectSource();
