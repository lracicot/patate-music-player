
class EndSearch {
  execute(state) {
    return state.set('search', '');
  }
}

export default new EndSearch();
