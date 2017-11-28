/**
 * fetchPlaylists - Fetch the authorization code
 *
 * @param {List} sources The list of sources
 * @param {string} query The query to search
 *
 * @return {Promise} Wait for the results
 */
export default async function fetchPlaylists(sources, query) {
  const promises = sources
    .filter(x => x.isConnected())
    .map(source => source.searchPlaylists(query));
  return Promise.all(promises);
}
