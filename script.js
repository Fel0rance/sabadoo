const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('dropdown');

const categories = [
    { name: 'گوشی', slug: 'mobile-phones', icon: 'https://img.icons8.com/ios/50/000000/smartphone.png' },
    { name: 'لپ‌تاپ', slug: 'laptops', icon: 'https://img.icons8.com/ios/50/000000/laptop.png' },
    { name: 'تلویزیون', slug: 'televisions', icon: 'https://img.icons8.com/ios/50/000000/tv.png' },
    { name: 'لوازم خانگی', slug: 'home-appliances', icon: 'https://img.icons8.com/ios/50/000000/washing-machine.png' },
    { name: 'دوربین', slug: 'cameras', icon: 'https://img.icons8.com/ios/50/000000/camera.png' },
    { name: 'سایر', slug: 'others', icon: 'https://img.icons8.com/ios/50/000000/shopping-bag.png' }
];

// نمایش یا مخفی کردن منو با انیمیشن
hamburger.addEventListener('click', () => {
    if (dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
    } else {
        renderDropdown(); // مطمئن شو آیتم‌ها آماده هستند
        dropdown.classList.add('active');
    }
});

function renderDropdown() {
    dropdown.innerHTML = '';
    categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'category-item';
        div.innerHTML = `<img src="${cat.icon}" alt="${cat.name}"><span>${cat.name}</span>`;
        div.addEventListener('click', () => {
            window.location.href = `/categories/${cat.slug}`;
        });
        dropdown.appendChild(div);
    });
}
