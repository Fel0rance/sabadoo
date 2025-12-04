const categories = [
  { id: 'phone', name: 'گوشی' },
  { id: 'laptop', name: 'لپ‌تاپ' },
  { id: 'tv', name: 'تلویزیون' },
  { id: 'headphones', name: 'هدفون' }
];

const products = [
  { id: 1, name: 'گوشی A', category: 'phone', image: 'images/phone1.jpg', priority: 5 },
  { id: 2, name: 'گوشی B', category: 'phone', image: 'images/phone2.jpg', priority: 3 },
  { id: 3, name: 'لپ‌تاپ X', category: 'laptop', image: 'images/laptop1.jpg', priority: 4 },
  { id: 4, name: 'تلویزیون Y', category: 'tv', image: 'images/tv1.jpg', priority: 2 },
  { id: 5, name: 'هدفون Z', category: 'headphones', image: 'images/headphones1.jpg', priority: 5 }
];

const PRODUCTS = [
  {
    id: "p-001",
    title: "گوشی هوشمند نمونه A",
    category: "mobile",
    views: 1250,
    images: ["https://via.placeholder.com/400x300?text=Mobile+A"],
    links: [{store: "digikala", url: "https://example.com/product/p-001"}],
    summary: "گوشی میان‌رده با مشخصات مناسب برای استفاده روزمره",
  },
  {
    id: "p-002",
    title: "هدفون بی‌سیم نمونه B",
    category: "audio",
    views: 980,
    images: ["https://via.placeholder.com/400x300?text=Headphone+B"],
    links: [{store: "digikala", url: "https://example.com/product/p-002"}],
    summary: "هدفون سبک با کیفیت صدای مناسب و عمر باتری خوب",
  },
  {
    id: "p-003",
    title: "لپ‌تاپ نمونه C",
    category: "laptop",
    views: 760,
    images: ["https://via.placeholder.com/400x300?text=Laptop+C"],
    links: [{store: "digikala", url: "https://example.com/product/p-003"}],
    summary: "لپ‌تاپ قدرتمند مناسب کارهای حرفه‌ای و گرافیکی",
  }
];

// utility to get top viewed products
function getTopViewed(limit = 3){
  return PRODUCTS.slice().sort((a,b)=>b.views - a.views).slice(0,limit);
}
