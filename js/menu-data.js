'use strict';

/* ============================================================
   KINGS BAKES – Complete Menu Data (from Official Price List)
   All 85+ items across 5 cake categories
   ============================================================ */

const KINGS_MENU = [
  {
    id: 'royal-icing',
    title: 'Royal Icing Cakes',
    subtitle: 'Simply Superb',
    tagline: '"Bringing back the sweet taste of our school days!"',
    emoji: '👑',
    hasPriceTable: true,
    upgrades: [
      { label: 'Extra Chocolate Drizzle / Ganache', price: '+₹150' },
      { label: 'Fresh Fruits', price: '+₹250' },
      { label: 'Premium Toppings (nuts, truffles)', price: '+₹300' },
      { label: 'Photo Print Theme Decoration', price: '+₹400 – ₹800' },
    ],
    items: [
      { name: 'Vanilla Royal Icing', price1kg: 400, priceHalf: 250 },
      { name: 'Chocolate Royal Icing', price1kg: 400, priceHalf: 250 },
      { name: 'Pineapple Royal Icing', price1kg: 400, priceHalf: 250 },
      { name: 'Strawberry Royal Icing', price1kg: 400, priceHalf: 250 },
      { name: 'Butterscotch Royal Icing', price1kg: 400, priceHalf: 250 },
    ]
  },
  {
    id: 'classic',
    title: 'Classic Flavours',
    subtitle: 'Everyday Flavours',
    tagline: '"Classic cakes. Royal taste. Forever favourites."',
    emoji: '🎂',
    hasPriceTable: true,
    items: [
      { name: 'White Forest', price1kg: 900, priceHalf: 500 },
      { name: 'Black Forest', price1kg: 700, priceHalf: 400 },
      { name: 'Blueberry', price1kg: 900, priceHalf: 500 },
      { name: 'Pineapple', price1kg: 700, priceHalf: 400 },
      { name: 'Kiwi Fresh', price1kg: 700, priceHalf: 400 },
      { name: 'Mango', price1kg: 800, priceHalf: 500 },
      { name: 'Butterscotch', price1kg: 800, priceHalf: 500 },
      { name: 'Choconuts', price1kg: 900, priceHalf: 500 },
      { name: 'Strawberry', price1kg: 800, priceHalf: 500 },
      { name: 'Caramel Fudge', price1kg: 1000, priceHalf: 600 },
      { name: 'Rasmalai', price1kg: 1300, priceHalf: 700 },
      { name: 'Choco Vanilla', price1kg: 900, priceHalf: 500 },
      { name: 'Orange', price1kg: 700, priceHalf: 400 },
      { name: 'Crispy Butterscotch', price1kg: 1000, priceHalf: 600 },
      { name: 'Choco Chips', price1kg: 1000, priceHalf: 600 },
      { name: 'Black Magic', price1kg: 800, priceHalf: 500 },
      { name: 'Choco Velvet', price1kg: 1000, priceHalf: 600 },
      { name: 'White Truffle', price1kg: 900, priceHalf: 500 },
      { name: 'Pistachio', price1kg: 1000, priceHalf: 600 },
      { name: 'Chocolate Truffle', price1kg: 900, priceHalf: 500 },
    ]
  },
  {
    id: 'premium',
    title: 'Premium Range',
    subtitle: 'Rich Cream with Premium Toppings',
    tagline: '"Because ordinary just isn\'t your style."',
    emoji: '💎',
    hasPriceTable: true,
    items: [
      { name: 'Vancho', price1kg: 1000, priceHalf: 600 },
      { name: 'Red Velvet', price1kg: 900, priceHalf: 500 },
      { name: 'Cadburica', price1kg: 1000, priceHalf: 600 },
      { name: 'Redbee', price1kg: 1000, priceHalf: 600 },
      { name: 'Death by Chocolate', price1kg: 1000, priceHalf: 600 },
      { name: 'Fudge Nuts', price1kg: 1200, priceHalf: 700 },
      { name: 'Nutty Bubbly', price1kg: 1100, priceHalf: 600 },
      { name: 'Irish Coffee', price1kg: 1000, priceHalf: 600 },
      { name: 'Nestle Cashew', price1kg: 1300, priceHalf: 700 },
      { name: 'Oreo Magic', price1kg: 1000, priceHalf: 600 },
      { name: 'Choco Scotch', price1kg: 1000, priceHalf: 600 },
      { name: 'Golden Vancho', price1kg: 1400, priceHalf: 800 },
      { name: 'Dark Caramel', price1kg: 1400, priceHalf: 800 },
      { name: 'Choco Red', price1kg: 1000, priceHalf: 600 },
      { name: 'Hazelnut Praline', price1kg: 1400, priceHalf: 800 },
      { name: 'Almond Bubbly', price1kg: 1500, priceHalf: 800 },
      { name: 'Purple Velvet', price1kg: 1000, priceHalf: 600 },
      { name: 'Farm Coffee', price1kg: 1100, priceHalf: 600 },
      { name: 'Rainbow Cassatta', price1kg: 1000, priceHalf: 600 },
      { name: 'Choco Bubbly', price1kg: 1000, priceHalf: 600 },
    ]
  },
  {
    id: 'signature',
    title: "Chef's Signature",
    subtitle: 'Special Recipe & Unique Flavours',
    tagline: '"Our most loved, most luxurious, and most unforgettable flavours."',
    emoji: '⭐',
    hasPriceTable: true,
    items: [
      { name: 'Mexican Delight', price1kg: 1500, priceHalf: 800 },
      { name: 'Tender Coconut', price1kg: 1700, priceHalf: 900 },
      { name: 'Kulfi Star', price1kg: 1400, priceHalf: 800 },
      { name: 'German Nuts', price1kg: 1500, priceHalf: 800 },
      { name: 'Chocobella', price1kg: 1900, priceHalf: 1000 },
      { name: 'Ferraro Rocher', price1kg: 1600, priceHalf: 900 },
      { name: 'Rafaello', price1kg: 1800, priceHalf: 1000 },
      { name: 'Dutch Chocolate', price1kg: 1400, priceHalf: 800 },
      { name: 'German Black', price1kg: 1200, priceHalf: 700 },
      { name: 'Lotus Punch', price1kg: 1400, priceHalf: 800 },
      { name: 'Strawberry Truffle', price1kg: 1100, priceHalf: 600 },
      { name: 'Nutella Kick', price1kg: 1300, priceHalf: 700 },
      { name: 'Pure Chocolate', price1kg: 1500, priceHalf: 800 },
      { name: 'Spanish Delight', price1kg: 1400, priceHalf: 800 },
      { name: 'Marvel Magic', price1kg: 1000, priceHalf: 600 },
      { name: 'Royal Garden', price1kg: 1500, priceHalf: 800 },
      { name: 'Kitgems', price1kg: 1500, priceHalf: 800 },
      { name: 'Mixed Fruit Exotica', price1kg: 1800, priceHalf: 1000 },
      { name: 'Chocolate Silk', price1kg: 1500, priceHalf: 800 },
      { name: 'Tiramisu Regular', price1kg: 1500, priceHalf: 800 },
      { name: 'Mont Blanc', price1kg: 1200, priceHalf: 700 },
      { name: 'Wild Chocolate', price1kg: 1400, priceHalf: 800 },
      { name: 'Blueberry Truffle', price1kg: 1400, priceHalf: 800 },
      { name: 'Royal Pistachio', price1kg: 1500, priceHalf: 800 },
      { name: 'Choco Barks', price1kg: 1500, priceHalf: 800 },
      { name: 'Canadian Blueberry', price1kg: 1300, priceHalf: 700 },
    ]
  },
  {
    id: 'cheese',
    title: 'Cheese Cakes',
    subtitle: 'Cheesy Creamy Zone',
    tagline: '"A melt-in-mouth moment of pure bliss."',
    emoji: '🧁',
    hasPriceTable: false,
    items: [
      { name: 'Lotus Biscoff', price1kg: 1400 },
      { name: 'OG New York Cheese', price1kg: 1800 },
      { name: 'Key Lime Cheese', price1kg: 1600 },
      { name: 'Vanilla Bourbon Cheese', price1kg: 2000 },
      { name: 'Tiramisu Cheese', price1kg: 1300 },
      { name: 'Creme Brulee', price1kg: 1800 },
      { name: 'Milo Melt', price1kg: 1600 },
      { name: 'Raspberry Cheese', price1kg: 1400 },
      { name: 'Pistachio Cheese', price1kg: 1300 },
      { name: 'Lavender Punch Cheese', price1kg: 1700 },
      { name: 'Blueberry Cheese', price1kg: 1400 },
      { name: 'Choco Chips Cheese', price1kg: 1400 },
      { name: 'Hazel Nut Cheese', price1kg: 1500 },
      { name: 'Fruit Pebbles', price1kg: 1600 },
    ]
  }
];

/* ── Render the full menu into #dynamic-menu-container ── */
function renderMenu(categories) {
  const container = document.getElementById('dynamic-menu-container');
  if (!container) return;

  if (categories.length === 0) {
    container.innerHTML = '<p class="menu-empty">No items found matching your search.</p>';
    return;
  }

  container.innerHTML = categories.map(cat => `
    <div class="cat-section reveal visible" data-cat="${cat.id}" id="cat-${cat.id}">
      <div class="cat-section-header">
        <div class="cat-emoji-bg">${cat.emoji}</div>
        <span class="cat-emoji">${cat.emoji}</span>
        <h2 class="cat-title">${cat.title}</h2>
        <p class="cat-subtitle">${cat.subtitle}</p>
        <p class="cat-tagline">${cat.tagline}</p>
        <span class="cat-count">${cat.items.length} Flavours</span>
      </div>

      ${cat.hasPriceTable ? `
        <div class="price-header">
          <span class="ph-name">Flavour</span>
          <span class="ph-prices">
            <span>1 kg</span>
            <span>½ kg</span>
          </span>
          <span class="ph-action"></span>
        </div>
      ` : `
        <div class="price-header">
          <span class="ph-name">Flavour</span>
          <span class="ph-prices single">
            <span>Per kg</span>
          </span>
          <span class="ph-action"></span>
        </div>
      `}

      <div class="menu-items-grid">
        ${cat.items.map(item => menuItemRow(item, cat)).join('')}
      </div>

      ${cat.upgrades ? `
        <div class="upgrades-box">
          <h4 class="upgrades-title">Optional Upgrades</h4>
          <div class="upgrades-list">
            ${cat.upgrades.map(u => `
              <div class="upgrade-item">
                <span class="upgrade-name">${u.label}</span>
                <span class="upgrade-price">${u.price}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');

  // Attach order listeners
  container.querySelectorAll('.mir-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.order;
      const price = btn.dataset.price;
      const phone = '917639277171';
      const msg = `Hi Kings Bakes! ${String.fromCodePoint(0x1F44B)}\nI'd like to order:\n${String.fromCodePoint(0x1F6D2)} *${item}*\n${String.fromCodePoint(0x1F4B0)} Starting from \u20B9${price}/kg\n\nPlease confirm availability and details. Thank you!`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
      const toast = document.getElementById('toast');
      if (toast) {
        toast.innerHTML = `<span class="t-icon">\u{1F4AC}</span>Opening WhatsApp\u2026`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      }
    });
  });
}

function menuItemRow(item, cat) {
  const orderLabel = `${item.name} – ${cat.title}`;
  if (cat.hasPriceTable) {
    return `
      <div class="menu-item-row reveal visible">
        <div class="mir-left">
          <span class="mir-veg-dot" title="Pure Veg"></span>
          <span class="mir-name">${item.name}</span>
        </div>
        <div class="mir-prices">
          <span class="mir-price">&#8377;${item.price1kg.toLocaleString('en-IN')}</span>
          <span class="mir-sep">|</span>
          <span class="mir-price half">&#8377;${item.priceHalf.toLocaleString('en-IN')}</span>
        </div>
        <button class="mir-order-btn" data-order="${orderLabel}" data-price="${item.price1kg}">
          Order
        </button>
      </div>`;
  }
  return `
    <div class="menu-item-row reveal visible">
      <div class="mir-left">
        <span class="mir-veg-dot" title="Pure Veg"></span>
        <span class="mir-name">${item.name}</span>
      </div>
      <div class="mir-prices single">
        <span class="mir-price">&#8377;${item.price1kg.toLocaleString('en-IN')}/kg</span>
      </div>
      <button class="mir-order-btn" data-order="${orderLabel}" data-price="${item.price1kg}">
        Order
      </button>
    </div>`;
}

/* ── Filter and Search Logic ── */
function filterMenu(catId, searchTerm) {
  let filtered = KINGS_MENU;

  if (catId && catId !== 'all') {
    filtered = filtered.filter(c => c.id === catId);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.name.toLowerCase().includes(term))
    })).filter(cat => cat.items.length > 0);
  }

  return filtered;
}

/* ── Initialize on DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dynamic-menu-container');
  if (!container) return;

  // Initial render
  renderMenu(KINGS_MENU);

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';
  let activeSearch = '';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderMenu(filterMenu(activeFilter, activeSearch));

      // Scroll to menu
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Search
  const searchEl = document.getElementById('searchMenu');
  if (searchEl) {
    searchEl.addEventListener('input', e => {
      activeSearch = e.target.value.trim();
      renderMenu(filterMenu(activeFilter, activeSearch));
    });
  }

  // Note bar eggless info
  const noteBar = document.getElementById('menu-note-bar');
  if (noteBar) noteBar.style.display = 'flex';
});
