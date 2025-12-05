// نمونه دسته‌ها
const categories = [
  { name: "گوشی", link: "phone.html" },
  { name: "لپ‌تاپ", link: "laptop.html" },
  { name: "تلویزیون", link: "tv.html" },
  { name: "هدفون", link: "headphones.html" },
  { name: "ساعت هوشمند", link: "watch.html" },
  { name: "دوربین", link: "camera.html" },
  { name: "تبلت", link: "tablet.html" }
];

// بارگذاری دسته‌ها
const categoryContainer = document.getElementById("categoryContainer");
categories.forEach(cat => {
  const a = document.createElement("a");
  a.href = cat.link;
  a.className = "category-item";
  a.textContent = cat.name;
  categoryContainer.appendChild(a);
});

// جستجو ساده
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = searchBox.value.trim();
    if (!q) return;
    // بعدا می‌توان به صفحه نتایج یا Supabase وصل کرد
    alert("جستجو: " + q);
  }
});
