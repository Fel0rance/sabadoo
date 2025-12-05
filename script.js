const searchBox = document.getElementById('searchBox');
const suggestionsDiv = document.getElementById('suggestions');

// نمونه داده دسته‌بندی‌ها
const categories = [
  "گوشی",
  "لپ‌تاپ",
  "تلویزیون",
  "هدفون",
  "ساعت هوشمند",
  "دوربین",
  "تبلت"
];

// نمایش پیشنهادات
function showSuggestions(value) {
  suggestionsDiv.innerHTML = "";
  if (!value) {
    suggestionsDiv.style.display = "none";
    return;
  }

  const filtered = categories.filter(cat => cat.includes(value));
  if (filtered.length === 0) {
    suggestionsDiv.style.display = "none";
    return;
  }

  filtered.forEach(cat => {
    const div = document.createElement('div');
    div.classList.add('suggestion-item');
    div.textContent = cat;
    div.addEventListener('click', () => {
      searchBox.value = cat;
      suggestionsDiv.style.display = "none";
      alert("انتخاب شد: " + cat);
      // اینجا میشه کار بعدی مثل نمایش محصولات اون دسته رو انجام داد
    });
    suggestionsDiv.appendChild(div);
  });

  suggestionsDiv.style.display = "flex";
}

// جستجو
function doSearch() {
  const query = searchBox.value.trim();
  if (!query) return;
  alert("درخواست جستجو: " + query);
  console.log("Search query:", query);
}

// رویدادها
searchBox.addEventListener('input', e => showSuggestions(e.target.value));
searchBox.addEventListener('keydown', e => { if (e.key === "Enter") doSearch(); });
