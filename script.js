const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');

function doSearch() {
  const query = searchBox.value.trim();
  if (!query) return;
  alert('درخواست جستجو: ' + query);
  console.log('Search query:', query);
}

searchButton.addEventListener('click', doSearch);
searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});
