// script.js (type=module expected by index.html)
// ---------------- Import supabase client (ESM) ----------------
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ---------------- Config (تو اینجا کلید عمومی استفاده شده) ----------------
const SUPABASE_URL = "https://jqxfxmpbubexauqmebzr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGZ4bXBidWJleGF1cW1lYnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDc0MDksImV4cCI6MjA4MDQyMzQwOX0.icUMw2XSnHB9_NJLiztI3pfn9ve0TTr7HaKE_DA18Nk";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------- Elements ----------------
const searchBox = document.getElementById("searchBox");
const suggestionsEl = document.getElementById("suggestions");
const categoryGrid = document.getElementById("categoryGrid");

// ---------------- Data holders ----------------
let categories = []; // objects {id, name, slug, image_url}

// ---------------- Utility: try multiple table names ----------------
async function tryFetchCategories() {
  // کِش محلی برای fallback
  const localFallback = [
    { id: 1, name: "موبایل", slug: "mobile", image_url: "" },
    { id: 2, name: "لپ‌تاپ", slug: "laptop", image_url: "" },
    { id: 3, name: "تلویزیون", slug: "tv", image_url: "" },
    { id: 4, name: "هدفون", slug: "headphone", image_url: "" },
    { id: 5, name: "ساعت هوشمند", slug: "watch", image_url: "" }
  ];

  const candidates = ["categories","category","Categories","Category"];
  for (const t of candidates) {
    try {
      const res = await supabase.from(t).select("*").order("id",{ascending:true});
      if (res.error) {
        // ignore and try next
        // console.debug("table", t, "error", res.error);
        continue;
      }
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch(e){
      // ignore
      // console.error(e);
    }
  }
  // fallback local
  return localFallback;
}

// ---------------- Render category cards ----------------
function renderCategoryGrid(list) {
  categoryGrid.innerHTML = "";
  list.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `<div class="category-title">${cat.name}</div>`;
    card.addEventListener("click", () => {
      // هدایت به صفحه دسته — می‌تونی category.html?slug=... یا ?id=...
      const slug = cat.slug || cat.name.replace(/\s+/g,"-").toLowerCase();
      window.location.href = `category.html?slug=${encodeURIComponent(slug)}&id=${cat.id}`;
    });
    categoryGrid.appendChild(card);
  });
}

// ---------------- Suggestions (autocomplete) ----------------
function showSuggestions(filtered) {
  if (!filtered || filtered.length === 0) {
    suggestionsEl.style.display = "none";
    suggestionsEl.innerHTML = "";
    return;
  }
  suggestionsEl.innerHTML = "";
  const fragment = document.createDocumentFragment();
  filtered.forEach(cat => {
    const d = document.createElement("div");
    d.className = "suggest-item";
    d.textContent = cat.name;
    d.addEventListener("click", () => {
      // انتخاب شده — بفرست به صفحه دسته
      const slug = cat.slug || cat.name.replace(/\s+/g,"-").toLowerCase();
      window.location.href = `category.html?slug=${encodeURIComponent(slug)}&id=${cat.id}`;
    });
    fragment.appendChild(d);
  });
  suggestionsEl.appendChild(fragment);
  suggestionsEl.style.display = "block";
}

// ---------------- Search input handler ----------------
function wireSearchInput() {
  if (!searchBox) return;
  searchBox.addEventListener("input", () => {
    const q = (searchBox.value || "").trim().toLowerCase();
    if (!q) {
      suggestionsEl.style.display = "none";
      suggestionsEl.innerHTML = "";
      return;
    }
    const filtered = categories.filter(c => (c.name||"").toLowerCase().includes(q));
    showSuggestions(filtered);
  });

  // hide suggestions when click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box-container") && !e.target.closest(".suggest-box")) {
      suggestionsEl.style.display = "none";
    }
  });
}

// ---------------- Init ----------------
async function init() {
  // load categories from Supabase (or fallback)
  categories = await tryFetchCategories();
  // normalize: ensure fields exist
  categories = categories.map(c => ({
    id: c.id ?? null,
    name: c.name ?? c.title ?? c.title_fa ?? "",
    slug: c.slug ?? (c.name ? c.name.replace(/\s+/g,"-").toLowerCase() : ""),
    image_url: c.image_url ?? c.image ?? ""
  }));

  renderCategoryGrid(categories);
  wireSearchInput();
}

// run after DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

