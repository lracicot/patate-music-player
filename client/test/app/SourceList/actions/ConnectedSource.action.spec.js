import { expect } from 'chai';
import { List, Map } from 'immutable';

import ConnectedSource from '../../../../app/SourceList/actions/ConnectedSource.action';

import SoundCloudProxy from '../../../../src/model/SoundCloudProxy';
import JamendoProxy from '../../../../src/model/JamendoProxy';
import SpotifyProxy from '../../../../src/model/SpotifyProxy';


describe('ConnectedSource', () => {
  it('Update the sources to connected', () => {
    let oldState = Map({
      sources: List([
        new JamendoProxy(),
        new SoundCloudProxy(),
        new SpotifyProxy(),
      ]),
    });

    // Connect first source
    let newState = ConnectedSource.execute(
      oldState,
      oldState.get('sources').get(0),
      'token1',
    );
    expect(newState.get('sources').get(0).status).to.equal('CONNECTED');
    expect(newState.get('sources').get(1).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('DISCONNECTED');
    oldState = newState;

    // Connect second source
    newState = ConnectedSource.execute(
      oldState,
      oldState.get('sources').get(1),
      'token2',
    );
    expect(newState.get('sources').get(0).status).to.equal('CONNECTED');
    expect(newState.get('sources').get(1).status).to.equal('CONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('DISCONNECTED');
    oldState = newState;

    // Connect third source
    newState = ConnectedSource.execute(
      oldState,
      oldState.get('sources').get(2),
      'token2',
    );
    expect(newState.get('sources').get(0).status).to.equal('CONNECTED');
    expect(newState.get('sources').get(1).status).to.equal('CONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('CONNECTED');
    oldState = newState;

    // Expect to have nothing else of changed
    oldState = oldState.delete('sources');
    newState = newState.delete('sources');
    expect(newState).to.equal(oldState);
  });
});
