const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

// وقتی کاربر تایپ می‌کند
searchInput.addEventListener('input', async () => {
    const query = searchInput.value;

    if (query.length < 2) {
        suggestionsList.innerHTML = ''; // پاک کردن پیشنهادات زمانی که ورودی کمتر از 2 حرف باشد
        return;
    }

    // اتصال به API Supabase و دریافت دسته‌بندی‌های مرتبط با جستجو
    try {
        const response = await fetch('https://jqxfxmpbubexauqmebzr.supabase.co/rest/v1/categories?category_name=ilike.' + encodeURIComponent('%' + query + '%'), {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGZ4bXBidWJleGF1cW1lYnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDc0MDksImV4cCI6MjA4MDQyMzQwOX0.icUMw2XSnHB9_NJLiztI3pfn9ve0TTr7HaKE_DA18Nk', // توکن API شما
                'Content-Type': 'application/json'
            }
        });

        const suggestions = await response.json();

        // نمایش پیشنهادات جستجو
        suggestionsList.innerHTML = ''; // پاک کردن پیشنهادات قبلی
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion.category_name;
            suggestionsList.appendChild(li);
        });
    } catch (error) {
        console.error('خطا در اتصال به Supabase:', error);
    }
});
