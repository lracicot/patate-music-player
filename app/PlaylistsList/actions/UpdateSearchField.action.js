class UpdateSearchField {
  execute(state, searchValue) {
    return state.set('playlistSearch', searchValue);
  }
}

export default new UpdateSearchField();
