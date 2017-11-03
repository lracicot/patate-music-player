import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { List } from 'immutable';

import Playlist from '../../../../src/model/Playlist';
import PlaylistItem from '../../../../app/PlaylistsList/components/playlist.component';


describe('PlaylistItem', () => {
  it('renders the playlist component', () => {
    const playlist = new Playlist(
      'name',
      'service',
      'uri',
      'art',
      List(),
    );
    const component = ReactTestUtils.renderIntoDocument(
      <PlaylistItem
        playlist={playlist}
        dispatch={() => 0}
      />,
    );
    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('renders the correct description', () => {
    let playlist = new Playlist(
      'name',
      'service',
      'uri',
      'art',
      List(),
    );
    let component = ReactTestUtils.renderIntoDocument(
      <PlaylistItem
        playlist={playlist}
        dispatch={() => 0}
      />,
    );
    expect(component.getDescription()).to.equal('0 track');

    playlist = new Playlist(
      'name',
      'service',
      'uri',
      'art',
      List(['Foo']),
    );
    component = ReactTestUtils.renderIntoDocument(
      <PlaylistItem
        playlist={playlist}
        dispatch={() => 0}
      />,
    );
    expect(component.getDescription()).to.equal('1 track');

    playlist = new Playlist(
      'name',
      'service',
      'uri',
      'art',
      List(['Foo', 'Bar']),
    );
    component = ReactTestUtils.renderIntoDocument(
      <PlaylistItem
        playlist={playlist}
        dispatch={() => 0}
      />,
    );
    expect(component.getDescription()).to.equal('2 tracks');
  });
});
