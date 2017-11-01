class UpdateSearch {
  execute(state, searchValue) {
    return state.set('playlistSearch', searchValue);
  }
}

export default new UpdateSearch();
