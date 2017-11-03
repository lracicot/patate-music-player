import { List } from 'immutable';

export default class Playlist {
  constructor(name, origin, uri, art, songs) {
    this.name = name;
    this.origin = origin;
    this.uri = uri;
    this.art = art;
    this.songs = List(songs);
  }
}
