
export function appendSearchResults(results) {
  return {
    type: 'APPEND_SEARCH_RESULTS',
    results,
  };
}

export function clearSearchResults() {
  return {
    type: 'CLEAR_SEARCH_RESULTS',
  };
}

export function search(keywords) {
  return {
    type: 'SEARCH',
    keywords,
  };
}


export function endSearch() {
  return {
    type: 'ENDSEARCH',
  };
}
