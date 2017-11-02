
class EndSearch {
  execute(state) {
    return state.set('searchQuery', '');
  }
}

export default new EndSearch();
