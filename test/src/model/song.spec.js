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

    expect(song.title === title);
    expect(song.streamUrl === streamUrl);
    expect(song.artworkUrl === artworkUrl);
  });
});
