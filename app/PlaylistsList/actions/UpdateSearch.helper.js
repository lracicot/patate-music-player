export default async function fetchPlaylists(sources, query) {
  const promises = sources
    .filter(x => x.isConnected())
    .map(source => source.searchPlaylists(query));
  return Promise.all(promises);
}
