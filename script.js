// -------------------------
//  اتصال به Supabase
// -------------------------
const SUPABASE_URL = "https://YOUR-PROJECT-ID.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// عناصر صفحه
const searchBox = document.getElementById("searchBox");
const suggestionsBox = document.getElementById("suggestions");

// لیست دسته بندی ها که از دیتابیس میگیریم
let categories = [];

// -------------------------
//  دریافت دسته‌بندی‌ها از Supabase
// -------------------------
async function loadCategories() {
    const { data, error } = await supabase.from("Category").select("*");

    if (error) {
        console.error("خطا در دریافت دسته بندی:", error);
        return;
    }

    categories = data;
    console.log("دسته‌بندی‌ها:", categories);
}

loadCategories();

// -------------------------
//  نمایش پیشنهادها هنگام تایپ
// -------------------------
searchBox.addEventListener("input", () => {
    const value = searchBox.value.trim();

    // اگر چیزی تایپ نشده بود، لیست پاک شود
    if (value === "") {
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
        return;
    }

    // فیلتر دسته‌بندی‌ها
    const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(value.toLowerCase())
    );

    // ساخت لیست
    suggestionsBox.innerHTML = "";

    filtered.forEach(cat => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        item.textContent = cat.name;

        item.addEventListener("click", () => {
            window.location.href = `category.html?id=${cat.id}`;
        });

        suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = filtered.length ? "block" : "none";
});

// -------------------------
//  جستجو با Enter
// -------------------------
searchBox.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        const value = searchBox.value.trim();
        if (!value) return;

        // پیدا کردن اولین دسته تطبیق داده شده
        const match = categories.find(cat =>
            cat.name.toLowerCase().includes(value.toLowerCase())
        );

        if (match) {
            window.location.href = `category.html?id=${match.id}`;
        }
    }
});
