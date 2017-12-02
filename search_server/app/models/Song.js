/**
* Song - This song is a data structure holding information for a track
*/
function song(title, streamUrl, artworkUrl) {
  return {
    title,
    streamUrl,
    artworkUrl,
  };
}

module.exports = song;
