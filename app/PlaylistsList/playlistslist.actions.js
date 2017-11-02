import fetchPlaylists from './actions/UpdateSearch.helper';

export const PLAYLIST_UPDATE_SEARCH_FIELD = 'PLAYLIST_UPDATE_SEARCH_FIELD';
function updateSearchField(searchValue) {
  return {
    type: PLAYLIST_UPDATE_SEARCH_FIELD,
    searchValue,
  };
}

export const PLAYLIST_UPDATE_SEARCH_RESULTS = 'PLAYLIST_UPDATE_SEARCH_RESULTS';
function updateSearchResults(searchResults) {
  return {
    type: PLAYLIST_UPDATE_SEARCH_RESULTS,
    searchResults,
  };
}

// https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
function flatten(arr) {
  return arr.filter(x => x !== null).reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

export function updateSearch(sources, searchValue) {
  return (dispatch) => {
    dispatch(updateSearchField(searchValue));
    return fetchPlaylists(sources, searchValue)
      .then(results => dispatch(updateSearchResults(flatten(results))));
  };
}
