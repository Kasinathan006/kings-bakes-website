document.addEventListener('DOMContentLoaded', () => {
    const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1`;

    // index.html - Featured Products
    const featuredGrid = document.querySelector('.products-grid');
    if (featuredGrid) {
        fetchFeaturedProducts(featuredGrid);
    }

    // menu.html - All Products
    const menuContainer = document.getElementById('dynamic-menu-container');
    if (menuContainer) {
        fetchAllProducts(menuContainer);
    }

    async function fetchFeaturedProducts(grid) {
        try {
            const res = await fetch(`${API_URL}/products/featured`);
            const data = await res.json();
            if (data.success && data.data.length > 0) {
                grid.innerHTML = data.data.map(productCard).join('');
                attachOrderListeners();
            } else {
                grid.innerHTML = '<p style="text-align:center;width:100%;color:#fff;">Coming soon. We are updating our featured items!</p>';
            }
        } catch (err) {
            console.error(err);
            grid.innerHTML = '<p style="text-align:center;width:100%;color:red;">Failed to load products. Please check if backend is running.</p>';
        }
    }

    async function fetchAllProducts(container) {
        try {
            const res = await fetch(`${API_URL}/products?limit=100`);
            const data = await res.json();
            if (data.success) {
                window.kingBakesProducts = data.data; // Store for filtering
                renderMenuCategories(container, data.data);
                setupMenuFilter();
            }
        } catch (err) {
            console.error(err);
            container.innerHTML = '<p style="text-align:center;width:100%;color:red;">Failed to load menu.</p>';
        }
    }

    function renderMenuCategories(container, products) {
        const categories = ['cakes', 'pastries', 'puffs', 'snacks', 'beverages'];
        const titles = { cakes: 'Custom & Birthday Cakes', pastries: 'Fresh Pastries', puffs: 'Hot Puffs', snacks: 'Savoury Snacks', beverages: 'Cool Beverages' };

        let html = '';
        categories.forEach(cat => {
            const catProducts = products.filter(p => p.category === cat && p.isAvailable);
            if (catProducts.length > 0) {
                html += `
          <div class="menu-category" data-cat="${cat}" style="margin-bottom: 50px;">
            <div class="category-header">
              <h2>${titles[cat]}</h2>
              <p>Freshly prepared daily</p>
            </div>
            <div class="menu-grid">
              ${catProducts.map(productCard).join('')}
            </div>
          </div>
        `;
            }
        });

        if (html === '') {
            html = '<p style="text-align:center;color:#fff;padding:50px;">No products matching your search were found.</p>';
        }

        container.innerHTML = html;
        attachOrderListeners();
    }

    function setupMenuFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            // Remove old listeners to prevent stacking if setupMenuFilter is called multiple times
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                newBtn.classList.add('active');

                const filter = newBtn.dataset.filter;
                const categories = document.querySelectorAll('.menu-category');

                categories.forEach(cat => {
                    if (filter === 'all' || cat.dataset.cat === filter) {
                        cat.style.display = '';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            });
        });
    }

    function productCard(p) {
        const badgeHtml = p.isFeatured
            ? '<div class="card-badge" style="background:var(--gold-primary);color:#000;">Featured</div>'
            : (p.isVeg ? '<div class="card-badge" style="background:#4caf50;color:#fff;">Veg</div>' : '<div class="card-badge" style="background:#f44336;color:#fff;">Non-Veg</div>');

        return `
      <article class="product-card reveal visible">
        <div class="card-img-wrap">
          <img src="${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='/images/cake.png'" />
          ${badgeHtml}
        </div>
        <div class="card-body">
          <h3 class="card-name">${p.name}</h3>
          <p class="card-desc">${p.description}</p>
          <div class="card-footer">
            <div class="card-price">₹${p.price}</div>
            <button class="card-order-btn" data-order="${p.name}" data-price="${p.price}">
              💬 Order
            </button>
          </div>
        </div>
      </article>
    `;
    }

    function attachOrderListeners() {
        document.querySelectorAll('.card-order-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                const item = newBtn.getAttribute('data-order');
                const price = newBtn.getAttribute('data-price');
                orderViaAPI(item, price);
            });
        });
    }

    function orderViaAPI(item, price) {
        const phone = '917639277171'; // Kings Bakes number
        const msg = `Hi Kings Bakes! 👋\nI'd like to order:\n🛒 Product: ${item}\n💰 Price: ₹${price}\n\nPlease confirm availability. Thank you!`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

        if (window.showToast) window.showToast('Opening WhatsApp…', '💬');
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 500);
    }

    // Hook into search if exists
    const searchEl = document.getElementById('searchMenu');
    if (searchEl) {
        // Clone to remove existing listeners just in case
        const newSearchEl = searchEl.cloneNode(true);
        searchEl.parentNode.replaceChild(newSearchEl, searchEl);

        newSearchEl.addEventListener('input', (e) => {
            if (!window.kingBakesProducts) return;
            const term = e.target.value.toLowerCase();
            const filtered = window.kingBakesProducts.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
            const container = document.getElementById('dynamic-menu-container');

            // Only update DOM if menu exists
            if (container) {
                renderMenuCategories(container, filtered);
                // Reset categories filter to 'all' visually when searching
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                const allBtn = document.getElementById('filter-all');
                if (allBtn) allBtn.classList.add('active');
            }
        });
    }
});
