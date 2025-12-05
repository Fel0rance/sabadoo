const categoryContainer = document.getElementById('categoryContainer');
const searchBox = document.getElementById('searchBox');

let categories = [];

// بارگذاری دسته‌بندی‌ها از JSON
fetch('categories.json')
  .then(res => res.json())
  .then(data => {
    categories = data;
    renderCategories(categories);
  });

// تابع نمایش دسته‌بندی‌ها
function renderCategories(list) {
  categoryContainer.innerHTML = '';
  list.forEach(cat => {
    const div = document.createElement('a');
    div.className = 'category-item';
    div.href = '#'; // بعداً لینک به صفحه دسته‌بندی واقعی
    div.innerHTML = `<img src="images/${cat.image}" alt="${cat.name}"><span>${cat.name}</span>`;
    categoryContainer.appendChild(div);
  });
}

// فیلتر کردن هنگام تایپ
searchBox.addEventListener('input', () => {
  const query = searchBox.value.trim();
  const filtered = categories.filter(c => c.name.includes(query));
  renderCategories(filtered);
});
