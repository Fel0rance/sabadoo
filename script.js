// اتصال به Supabase
const SUPABASE_URL = "https://jqxfxmpbubexauqmebzr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGZ4bXBidWJleGF1cW1lYnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDc0MDksImV4cCI6MjA4MDQyMzQwOX0.icUMw2XSnHB9_NJLiztI3pfn9ve0TTr7HaKE_DA18Nk";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// المنت‌ها
const categoryContainer = document.getElementById('categoryContainer');
const searchBox = document.getElementById('searchBox');
const searchResults = document.getElementById('searchResults');

let categories = [];

// دریافت دسته‌بندی‌ها از Supabase
async function loadCategories() {
  const { data, error } = await supabase
    .from('category')
    .select('*')
    .order('id');

  if (error) {
    console.error('Supabase error:', error);
    return;
  }

  categories = data;
  renderCategories(categories);
}

// نمایش دسته‌بندی‌ها در صفحه اصلی
function renderCategories(list) {
  categoryContainer.innerHTML = '';
  list.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'category-item';
    div.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}">
      <span>${cat.name}</span>
    `;
    div.onclick = () => {
      alert(`منتقل شد به دسته‌بندی: ${cat.name}`);
      // بعداً اینجا می‌تونی به صفحه دسته‌بندی لینک بدی
    };
    categoryContainer.appendChild(div);
  });
}

// جستجو
searchBox.addEventListener('input', () => {
  const query = searchBox.value.toLowerCase();
  if (!query) {
    searchResults.innerHTML = '';
    return;
  }

  const filtered = categories.filter(c => c.name.toLowerCase().includes(query));

  searchResults.innerHTML = '';
  filtered.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c.name;
    li.onclick = () => {
      searchBox.value = c.name;
      searchResults.innerHTML = '';
      alert(`منتقل شد به دسته‌بندی: ${c.name}`);
      // بعداً اینجا می‌تونی به صفحه دسته‌بندی لینک بدی
    };
    searchResults.appendChild(li);
  });
});

// بارگذاری اولیه
loadCategories();
