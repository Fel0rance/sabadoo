/* main.js
   - کدهای حداقلی برای تعامل: ناوبری موبایل، پرکردن کارت‌ها نمونه، فرم تماس (فیک).
   - اگر نمی‌خواهی JS اجرا شود، می‌توانی این فایل را حذف کنی؛ اما برخی قسمت‌ها مثل پر شدن خودکار کارت‌ها از کار می‌افتد.
*/

/* موبایل: باز/بستن منو */
(function(){
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const nav = document.getElementById('mainNav') || document.querySelector('.nav');
      if(!nav) return;
      const isVisible = nav.style.display === 'flex' || getComputedStyle(nav).display === 'flex';
      nav.style.display = isVisible ? 'none' : 'flex';
    });
  });
})();

/* نمونه داده‌ها — می‌تونی با JSON خارجی جایگزین کنی */
const SAMPLE_CATEGORIES = [
  {id:'phones', title:'موبایل', desc:'راهنمای خرید گوشی و انتخاب مناسب ترین مدل'},
  {id:'laptops', title:'لپ‌تاپ', desc:'راهنمای خرید لپ‌تاپ برای کار، تحصیل و بازی'},
  {id:'home', title:'لوازم خانگی', desc:'یخچال، ماشین لباسشویی، جاروبرقی و...'},
  {id:'audio', title:'صوت و تصویر', desc:'هدفون، اسپیکر و تجهیزات صوتی'},
  {id:'kitchen', title:'آشپزخانه', desc:'وسایل کوچک آشپزخانه و ابزار کاربردی'}
];

const SAMPLE_GUIDES = [
  {id:'g1', title:'بهترین موبایل تا ۱۰ میلیون', category:'phones', summary:'لیست گوشی‌های با بهترین ارزش خرید', score:8.2},
  {id:'g2', title:'لپ‌تاپ برای برنامه‌نویس‌ها', category:'laptops', summary:'چه لپ‌تاپی مناسب توسعه نرم‌افزار است؟', score:8.8},
  {id:'g3', title:'ظرفشویی: چه مدلی بخریم؟', category:'home', summary:'نکات قبل از خرید ظرفشویی', score:7.9}
];

/* رندر کارت‌های دسته‌ها در صفحه اصلی و صفحه categories */
function renderCategories(){
  const elPreview = document.getElementById('categoriesPreview');
  const elList = document.getElementById('categoriesList');

  const htmlCard = c => `
    <article class="card">
      <div class="card-head">${c.title}</div>
      <div class="card-body">${c.desc}</div>
      <div style="margin-top:12px">
        <a class="btn ghost" href="category.html?cat=${c.id}">مشاهده</a>
      </div>
    </article>
  `;

  if(elPreview) elPreview.innerHTML = SAMPLE_CATEGORIES.map(htmlCard).join('');
  if(elList) elList.innerHTML = SAMPLE_CATEGORIES.map(htmlCard).join('');
}

/* رندر راهنماها/گایدهای پیشنهادی */
function renderGuides(){
  const container = document.getElementById('featuredGuides');
  if(!container) return;
  container.innerHTML = SAMPLE_GUIDES.map(g=>`
    <article class="card">
      <div class="card-head">${g.title}</div>
      <div class="card-body">${g.summary}</div>
      <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div class="muted">امتیاز: ${g.score}</div>
        <div><a class="btn ghost" href="product.html?id=${g.id}">مشاهده</a></div>
      </div>
    </article>
  `).join('');
}

/* رندر مقالات (نمونه) */
function renderArticles(){
  const el = document.getElementById('articlesGrid');
  if(!el) return;
  el.innerHTML = [
    {t:'چگونه تلفن مناسب انتخاب کنیم', desc:'یک راهنمای ساده برای نیازهای متفاوت'},
    {t:'نکات خرید لپ‌تاپ در ۱۴۰۴', desc:'چه مشخصاتی مهم‌تر است؟'}
  ].map(a=>`
    <article class="card">
      <div class="card-head">${a.t}</div>
      <div class="card-body">${a.desc}</div>
      <div style="margin-top:12px"><a class="btn ghost" href="article.html">خواندن</a></div>
    </article>
  `).join('');
}

/* پر کردن محصولات در صفحه category.html (مثال) */
function renderProducts(){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  const exampleProducts = [
    {title:'Galaxy S24', desc:'پرچم‌دار سامسونگ', price:'قیمت متوسط'},
    {title:'iPhone 16', desc:'جدید اپل', price:'قیمت بالا'},
    {title:'Redmi Note 13', desc:'بودجه محور', price:'قیمت پایین'}
  ];
  grid.innerHTML = exampleProducts.map(p=>`
    <article class="card">
      <div class="card-head">${p.title}</div>
      <div class="card-body">${p.desc}</div>
      <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <span class="muted">${p.price}</span>
        <a class="btn ghost" href="product.html">${'مشاهده'}</a>
      </div>
    </article>
  `).join('');
}

/* فرم تماس فیک (نمایش پیام موفق) */
(function contactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('contactStatus');
  const btn = document.getElementById('contactSubmit');

  btn.addEventListener('click', ()=>{
    const name = document.getElementById('c_name').value.trim();
    const email = document.getElementById('c_email').value.trim();
    const msg = document.getElementById('c_message').value.trim();
    if(!name || !email || !msg){
      status.textContent = 'لطفاً همه فیلدها را پر کنید.';
      return;
    }
    // چون سرور نداریم، فقط شبیه‌سازی می‌کنیم
    status.textContent = 'در حال ارسال...';
    setTimeout(()=> {
      status.textContent = 'پیغام با موفقیت ثبت شد. ممنون!';
      form.reset();
    }, 700);
  });
})();

/* initial rendering */
document.addEventListener('DOMContentLoaded', ()=>{
  renderCategories();
  renderGuides();
  renderArticles();
  renderProducts();
});
