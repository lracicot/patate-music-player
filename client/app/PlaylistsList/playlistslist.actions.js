import Axios from 'axios';

export const PLAYLIST_UPDATE_SEARCH_FIELD = 'PLAYLIST_UPDATE_SEARCH_FIELD';

/**
 * updateSearchField - Creates an action named "PLAYLIST_UPDATE_SEARCH_FIELD" with
 * the required data to execute the reducer action
 *
 * @param {string} searchValue The search field
 *
 * @return {ActionCreator} The action creator
 */
function updateSearchField(searchValue) {
  return {
    type: PLAYLIST_UPDATE_SEARCH_FIELD,
    searchValue,
  };
}

export const PLAYLIST_UPDATE_SEARCH_RESULTS = 'PLAYLIST_UPDATE_SEARCH_RESULTS';
/**
 * updateSearchResults - Creates an action named "PLAYLIST_UPDATE_SEARCH_RESULTS" with
 * the required data to execute the reducer action
 *
 * @param {List} searchResults The search results
 *
 * @return {ActionCreator} The action creator
 */
function updateSearchResults(searchResults) {
  return {
    type: PLAYLIST_UPDATE_SEARCH_RESULTS,
    searchResults,
  };
}


/**
 * flatten - Flatten an array of arrays of arrays of arrays of arrays.
 * https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
 *
 * @param {Array} arr The array to be flattened
 *
 * @return {Array} Flattened arary
 */
function flatten(arr) {
  return arr.filter(x => x !== null).reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

/**
 * updateSearch - Update the search and search in the sources
 *
 * @param {string} searchValue The query
 * @param {string} accessToken The access token
 *
 * @return {Promise} The promise to wait this action
 */
export function updateSearch(searchValue, accessToken) {
  return (dispatch) => {
    dispatch(updateSearchField(searchValue));
    return Axios.get(`http://localhost:3000/api/searchPlaylists/${searchValue}`, {
      headers: { token: accessToken },
    }).then(
      results => dispatch(updateSearchResults(flatten(results.data.playlists))),
    );
  };
}
