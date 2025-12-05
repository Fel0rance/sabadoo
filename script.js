import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jqxfxmpbubexauqmebzr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGZ4bXBidWJleGF1cW1lYnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDc0MDksImV4cCI6MjA4MDQyMzQwOX0.icUMw2XSnHB9_NJLiztI3pfn9ve0TTr7HaKE_DA18Nk";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");

let categories = [];

// -----------------------------
// دریافت دسته‌بندی‌ها از Supabase
// -----------------------------
async function loadCategories() {
    const { data, error } = await supabase.from("category").select("*");

    if (error) {
        console.error("Error loading categories:", error);
        return;
    }

    categories = data;
}

// -----------------------------
// نمایش دسته‌بندی‌ها
// -----------------------------
function showCategories(filtered) {
    categoryList.innerHTML = "";

    if (filtered.length === 0) {
        categoryList.style.display = "none";
        return;
    }

    filtered.forEach(cat => {
        const li = document.createElement("li");
        li.textContent = cat.name;
        categoryList.appendChild(li);
    });

    categoryList.style.display = "block";
}

// -----------------------------
// واکنش به تایپ در سرچ
// -----------------------------
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim();

    if (keyword === "") {
        categoryList.style.display = "none";
        return;
    }

    const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
    );

    showCategories(filtered);
});

// شروع کار
loadCategories();
