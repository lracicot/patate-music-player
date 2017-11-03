import { expect } from 'chai';
import { List } from 'immutable';

import Playlist from '../../../src/model/Playlist';


describe('Playlist', () => {
  let playlist;

  beforeEach((done) => {
    playlist = new Playlist();
    done();
  });

  it('Is playlist builded', () => {
    const name = 'foo';
    const origin = 'bar';
    const uri = 'foobar';
    const art = 'art';
    const songs = ['Song'];

    playlist = new Playlist(name, origin, uri, art, songs);

    expect(playlist.name).to.equal(name);
    expect(playlist.origin).to.equal(origin);
    expect(playlist.uri).to.equal(uri);
    expect(playlist.art).to.equal(art);
    expect(typeof playlist.songs).to.equal(typeof List());
    expect(playlist.songs.count()).to.equal(songs.length);
    expect(playlist.songs.get(0)).to.equal(songs[0]);
  });
});
