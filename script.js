const categoryContainer = document.getElementById('category-container');
const productList = document.getElementById('product-list');

// نمایش دسته‌بندی‌ها
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.textContent = cat.name;
  btn.className = 'category-item';
  btn.addEventListener('click', () => showProducts(cat.id));
  categoryContainer.appendChild(btn);
});

// نمایش محصولات بر اساس دسته‌بندی
function showProducts(categoryId) {
  productList.innerHTML = ''; // پاک کردن قبلی‌ها
  const filtered = products.filter(p => p.category === categoryId);
  filtered.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>اولویت: ${p.priority}</p>
      <button onclick="buyProduct(${p.id})">خرید</button>
    `;
    productList.appendChild(div);
  });
}

// دکمه خرید (فعلاً alert)
function buyProduct(id) {
  const prod = products.find(p => p.id === id);
  if(prod) alert('میخوای خرید کنی: ' + prod.name);
}

function init(){
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsEl = document.getElementById('searchResults');
  const bannersContainer = document.getElementById('bannersContainer');

  // render top viewed banners
  const top = getTopViewed(4);
  top.forEach(p=>{
    const card = document.createElement('a');
    card.className = 'banner-card';
    card.href = p.links && p.links[0] ? p.links[0].url : '#';
    card.target = '_blank';
    card.innerHTML = `\n      <img src="${p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/400x300?text=Product'}" alt="${p.title}" />\n      <div class="banner-title">${p.title}</div>\n      <div class="banner-link">مشاهده و خرید</div>\n    `;
    bannersContainer.appendChild(card);
  });

  function doSearch(){
    const q = searchInput.value.trim();
    resultsEl.innerHTML = '';
    if(!q){
      resultsEl.innerHTML = '<p class="sr-only">نتیجه‌ای برای جستجو وجود ندارد</p>';
      return;
    }

    const matches = PRODUCTS.filter(p=>{
      const inTitle = p.title && p.title.includes(q);
      const inCategory = p.category && p.category.includes(q);
      return inTitle || inCategory;
    });

    if(matches.length===0){
      resultsEl.innerHTML = '<div class="search-item">نتیجه‌ای یافت نشد</div>';
      return;
    }

    matches.forEach(p=>{
      const el = document.createElement('div');
      el.className = 'search-item';
      el.innerHTML = `\n        <h3>${p.title}</h3>\n        <p>${p.summary || ''}</p>\n      `;
      el.addEventListener('click', ()=>{
        // اگر لینک محصول داشتیم به فروشگاه منتقل می‌شویم
        if(p.links && p.links[0] && p.links[0].url){
          window.open(p.links[0].url, '_blank');
        }
      });
      resultsEl.appendChild(el);
    });
  }

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') doSearch(); });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }
