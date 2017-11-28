import { expect } from 'chai';
import { List, Map } from 'immutable';

import UpdateSearchResults from '../../../../app/PlaylistsList/actions/UpdateSearchResults.action';


describe('UpdateSearchResults', () => {
  it('Update the search results', () => {
    let oldState = Map({
      playlistsFound: 'oldValue',
      foo: 'bar',
    });
    let newState = UpdateSearchResults.execute(oldState, ['newValue']);

    expect(typeof newState.get('playlistsFound')).to.equal(typeof List());
    expect(newState.get('playlistsFound').count()).to.equal(1);
    expect(newState.get('playlistsFound').get(0)).to.equal('newValue');

    // Expect to have nothing else of changed
    oldState = oldState.delete('playlistsFound');
    newState = newState.delete('playlistsFound');
    expect(newState).to.equal(oldState);
  });
});
