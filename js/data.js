/* exported data */
var data = {
  view: 'search-form',
  recipe: null,
  library: [],
  nextEntryId: 1
};

var previousSearchInput = localStorage.getItem('recipe-local-storage');

if (previousSearchInput !== null) {
  data = JSON.parse(previousSearchInput);
}

window.addEventListener('beforeunload', function (e) {
  var searchInput = JSON.stringify(data);
  localStorage.setItem('recipe-local-storage', searchInput);
});
