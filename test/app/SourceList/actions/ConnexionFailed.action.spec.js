import { expect } from 'chai';
import { List, Map } from 'immutable';

import ConnexionFailedSource from '../../../../app/SourceList/actions/ConnexionFailedSource.action';

import SoundCloudProxy from '../../../../src/model/SoundCloudProxy';
import JamendoProxy from '../../../../src/model/JamendoProxy';
import SpotifyProxy from '../../../../src/model/SpotifyProxy';


describe('ConnexionFailedSource', () => {
  it('Update the sources to connecting', () => {
    let oldState = Map({
      sources: List([
        new JamendoProxy().setAccessToken('foo'),
        new SoundCloudProxy().setAccessToken('foo'),
        new SpotifyProxy().setAccessToken('foo'),
      ]),
    });

    // Disconnect first source
    let newState = ConnexionFailedSource.execute(
      oldState,
      oldState.get('sources').get(0),
      null,
    );
    expect(newState.get('sources').get(0).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(1).status).to.equal('CONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('CONNECTED');
    oldState = newState;

    // Disconnect second source
    newState = ConnexionFailedSource.execute(
      oldState,
      oldState.get('sources').get(1),
      null,
    );
    expect(newState.get('sources').get(0).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(1).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('CONNECTED');
    oldState = newState;

    // Disconnect third source
    newState = ConnexionFailedSource.execute(
      oldState,
      oldState.get('sources').get(2),
      null,
    );
    expect(newState.get('sources').get(0).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(1).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('DISCONNECTED');
    oldState = newState;

    // Expect to have nothing else of changed
    oldState = oldState.delete('sources');
    newState = newState.delete('sources');
    expect(newState).to.equal(oldState);
  });
});
