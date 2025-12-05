// --------------------------------------------------
//   اتصال به Supabase
// --------------------------------------------------
const SUPABASE_URL = "https://jqxfxmpbubexauqmebzr.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGZ4bXBidWJleGF1cW1lYnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDc0MDksImV4cCI6MjA4MDQyMzQwOX0.icUMw2XSnHB9_NJLiztI3pfn9ve0TTr7HaKE_DA18Nk";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --------------------------------------------------
//   گرفتن دسته‌بندی‌ها از Supabase
// --------------------------------------------------
let allCategories = [];

async function loadCategories() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*");

  if (error) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error);
    return;
  }

  allCategories = data || [];
  console.log("Categories loaded:", allCategories);
}

// فوراً دسته‌بندی‌ها را لود کن
loadCategories();

// --------------------------------------------------
//   سرچ — پیشنهاد دسته‌بندی‌ها هنگام تایپ
// --------------------------------------------------

const searchBox = document.getElementById("searchBox");
const suggestionBox = document.getElementById("suggestions"); // این دیو باید داخل HTML اضافه شده باشه

searchBox.addEventListener("input", () => {
  const q = searchBox.value.trim();

  if (!q) {
    suggestionBox.innerHTML = "";
    suggestionBox.style.display = "none";
    return;
  }

  const filtered = allCategories.filter((cat) =>
    cat.name.toLowerCase().includes(q.toLowerCase())
  );

  if (filtered.length === 0) {
    suggestionBox.innerHTML = "";
    suggestionBox.style.display = "none";
    return;
  }

  suggestionBox.innerHTML = filtered
    .map((c) => `<div class="suggest-item">${c.name}</div>`)
    .join("");

  suggestionBox.style.display = "block";

  document.querySelectorAll(".suggest-item").forEach((item) => {
    item.addEventListener("click", () => {
      searchBox.value = item.textContent;
      suggestionBox.innerHTML = "";
      suggestionBox.style.display = "none";

      // بعداً اینجا ریدایرکت می‌ذاری—for example:
      // window.location.href = `/category.html?name=${item.textContent}`;
    });
  });
});

// --------------------------------------------------
//   سرچ با دکمه یا Enter
// --------------------------------------------------
const searchButton = document.getElementById("searchButton");

function doSearch() {
  const q = searchBox.value.trim();
  if (!q) return;

  alert("جستجو: " + q);
}

searchButton.addEventListener("click", doSearch);
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});
