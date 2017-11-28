import { expect } from 'chai';
import { Map } from 'immutable';

import UpdateSearchField from '../../../../app/PlaylistsList/actions/UpdateSearchField.action';


describe('UpdateSearchField', () => {
  it('Update the search field', () => {
    let oldState = Map({
      playlistSearch: 'oldValue',
      foo: 'bar',
    });
    let newState = UpdateSearchField.execute(oldState, 'newValue');

    expect(newState.get('playlistSearch')).to.equal('newValue');

    // Expect to have nothing else of changed
    oldState = oldState.delete('playlistSearch');
    newState = newState.delete('playlistSearch');
    expect(newState).to.equal(oldState);
  });
});
