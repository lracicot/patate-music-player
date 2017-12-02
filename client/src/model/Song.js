/**
* Song - This song is a data structure holding information for a track
*/
export default class Song {
  /**
   * constructor - Construct a song
   *
   * @param {string} title      Title of the song
   * @param {string} streamUrl  Downloadable link of the song
   * @param {string} artworkUrl Url of the picture linked to this song
   *
   * @return {Song} The constructed object
   */
  constructor(title, streamUrl, artworkUrl) {
    this.title = title;
    this.streamUrl = streamUrl;
    this.artworkUrl = artworkUrl;
  }
}
