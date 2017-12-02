/**
 * playlist
 *
 * @param  {string} name   The name of the playlist
 * @param  {string} origin The name of the service
 * @param  {string} uri    Unique ID of the playlist
 * @param  {string} art    URL of the logo
 * @param  {List} songs    List of songs
 * @return {Playlist}      The constructed object
 */
function playlist(name, origin, uri, art, songs) {
  return { name, origin, uri, art, songs };
}


module.exports = playlist;
