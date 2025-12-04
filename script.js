const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');

function doSearch() {
    const q = (searchBox.value || "").trim();
    if (!q) {
        searchBox.focus();
        return;
    }

    alert("جستجو: " + q);
}

if (searchButton) {
    searchButton.addEventListener('click', doSearch);
}

if (searchBox) {
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch();
    });
}
