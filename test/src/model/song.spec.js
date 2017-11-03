import { expect } from 'chai';

import Song from '../../../src/model/Song';


describe('Song', () => {
  let song;

  beforeEach((done) => {
    song = new Song();
    done();
  });

  it('Is song builded', () => {
    const title = 'foo';
    const streamUrl = 'bar';
    const artworkUrl = 'foobar';

    song = new Song(title, streamUrl, artworkUrl);

    expect(song.title).to.equal(title);
    expect(song.streamUrl).to.equal(streamUrl);
    expect(song.artworkUrl).to.equal(artworkUrl);
  });
});
