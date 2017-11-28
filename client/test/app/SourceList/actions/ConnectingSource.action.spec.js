import { expect } from 'chai';
import { List, Map } from 'immutable';

import ConnectingSource from '../../../../app/SourceList/actions/ConnectingSource.action';

import SoundCloudProxy from '../../../../src/model/SoundCloudProxy';
import JamendoProxy from '../../../../src/model/JamendoProxy';
import SpotifyProxy from '../../../../src/model/SpotifyProxy';


describe('ConnectingSource', () => {
  it('Update the sources to connecting', () => {
    let oldState = Map({
      sources: List([
        new JamendoProxy(),
        new SoundCloudProxy(),
        new SpotifyProxy(),
      ]),
    });

    // Connect first source
    let newState = ConnectingSource.execute(
      oldState,
      oldState.get('sources').get(0),
    );
    expect(newState.get('sources').get(0).status).to.equal('CONNECTING');
    expect(newState.get('sources').get(1).status).to.equal('DISCONNECTED');
    expect(newState.get('sources').get(2).status).to.equal('DISCONNECTED');
    oldState = newState;

    // Connect second source
    newState = ConnectingSource.execute(
      oldState,
      oldState.get('sources').get(1),
    );
    expect(newState.get('sources').get(0).status).to.equal('CONNECTING');
    expect(newState.get('sources').get(1).status).to.equal('CONNECTING');
    expect(newState.get('sources').get(2).status).to.equal('DISCONNECTED');
    oldState = newState;

    // Connect third source
    newState = ConnectingSource.execute(
      oldState,
      oldState.get('sources').get(2),
    );
    expect(newState.get('sources').get(0).status).to.equal('CONNECTING');
    expect(newState.get('sources').get(1).status).to.equal('CONNECTING');
    expect(newState.get('sources').get(2).status).to.equal('CONNECTING');
    oldState = newState;

    // Expect to have nothing else of changed
    oldState = oldState.delete('sources');
    newState = newState.delete('sources');
    expect(newState).to.equal(oldState);
  });
});
