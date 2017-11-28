import { List } from 'immutable';

/**
 * This class is a data structure to hold all relevant information
 * about a playlist
 */
export default class Playlist {
  /**
   * constructor - The constructor of this class
   *
   * @param  {string} name   The name of the playlist
   * @param  {string} origin The name of the service
   * @param  {string} uri    Unique ID of the playlist
   * @param  {string} art    URL of the logo
   * @param  {List} songs    List of songs
   * @return {Playlist}      The constructed object
   */
  constructor(name, origin, uri, art, songs) {
    this.name = name;
    this.origin = origin;
    this.uri = uri;
    this.art = art;
    this.songs = List(songs);
  }
}
