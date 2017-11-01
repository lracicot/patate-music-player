export const PLAYLIST_UPDATE_SEARCH = 'PLAYLISTUPDATESEARCH';
export function updateSearch(searchValue) {
  return {
    type: PLAYLIST_UPDATE_SEARCH,
    searchValue,
  };
}
