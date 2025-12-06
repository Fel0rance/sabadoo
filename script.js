// فرض بر این است که شما کتابخانه Supabase را در پروژه‌تان اضافه کرده‌اید
// اگر کتابخانه را اضافه نکردید، ابتدا این خط را در بخش head پروژه‌تان اضافه کنید:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

// متغیرها برای جعبه جستجو و پیشنهادات
const searchInput = document.getElementById('search'); // جعبه جستجو
const suggestionsList = document.getElementById('suggestions'); // لیست پیشنهادات

// اتصال به Supabase
const supabase = createClient('https://your-project-url.supabase.co', 'your-anon-key');

// تابع برای جستجو در دسته‌بندی‌ها
async function searchCategories(query) {
    const { data, error } = await supabase
        .from('categories') // نام جدول دسته‌بندی‌ها
        .select('category_name, category_slug')
        .ilike('category_name', `%${query}%`); // جستجو با استفاده از like برای نام دسته‌بندی

    if (error) {
        console.error('Error:', error);
        return [];
    }
    
    return data;
}

// زمانی که کاربر شروع به تایپ می‌کند
searchInput.addEventListener('input', async () => {
    const query = searchInput.value;

    // اگر طول ورودی کمتر از 2 کاراکتر باشد، پیشنهادات را پاک می‌کنیم
    if (query.length < 2) {
        suggestionsList.innerHTML = '';
        return;
    }

    // جستجو در Supabase برای دسته‌بندی‌ها
    const categories = await searchCategories(query);

    // پاک کردن پیشنهادات قبلی
    suggestionsList.innerHTML = '';

    // اگر دسته‌بندی‌ها پیدا شدند، آن‌ها را نمایش می‌دهیم
    if (categories.length > 0) {
        categories.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${category.category_name}</strong>`;
            
            // وقتی کاربر روی یک دسته‌بندی کلیک می‌کند، به صفحه آن منتقل می‌شود
            li.addEventListener('click', () => {
                // به صفحه دسته‌بندی منتقل می‌شویم
                window.location.href = `/categories/${category.category_slug}`;
            });
            
            suggestionsList.appendChild(li);
        });
    } else {
        suggestionsList.innerHTML = '<li>هیچ دسته‌بندی پیدا نشد</li>';
    }
});
