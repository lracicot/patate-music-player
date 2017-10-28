// Axios for Ajax
import Axios from 'axios';

import Song from './Song';

const clientId = '2f98992c40b8edf17423d93bda2e04ab';

export default class SoundCloudProxy {
  prepareUrl(url) {
    return `${url}?client_id=${clientId}`;
  }

  async loadRandomPlaylist() {
    return this.search('');
  }

  async search(query) {
    try {
      const response = await Axios.get(`https://api.soundcloud.com/tracks?client_id=${clientId}&q=${query}`);
      const songs = [];

      Object.keys(response.data).forEach((key) => {
        const track = response.data[key];
        const song = new Song(
          track.title,
          this.prepareUrl(track.stream_url),
          track.artwork_url,
        );
        songs.push(song);
      });

      return songs;
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}