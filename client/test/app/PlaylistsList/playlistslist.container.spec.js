import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { List } from 'immutable';

import Playlist from '../../../src/model/Playlist';
import { PlaylistsList } from '../../../app/PlaylistsList/playlistslist.container';


describe('PlaylistsList', () => {
  it('renders the playlistslist container', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <PlaylistsList
        playlists={List([])}
        sources={List([])}
        dispatch={() => 0}
      />,
    );
    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('Shows the playlists', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <PlaylistsList
        playlists={List([new Playlist(), new Playlist()])}
        sources={List([])}
        dispatch={() => 0}
      />,
    );

    const div = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'item');
    expect(div.length).to.equal(2);
  });
});
