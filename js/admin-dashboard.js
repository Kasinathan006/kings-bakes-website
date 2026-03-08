document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = '/admin.html';
        return;
    }

    const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1`;

    // State
    let allProducts = [];
    let allContacts = [];
    let editingId = null;

    // DOM Elements
    const tbody = document.getElementById('products-table-body');
    const contactsBody = document.getElementById('contacts-table-body');
    const modal = document.getElementById('product-modal');
    const addModalBtn = document.getElementById('open-add-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const form = document.getElementById('product-form');
    const logoutBtn = document.getElementById('logout-btn');

    // ── Navigation ──────────────────────────────────────────────
    document.querySelectorAll('.admin-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.admin-menu a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const target = link.dataset.target;
            document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('admin-hide'));
            document.getElementById(target).classList.remove('admin-hide');

            if (target === 'products-view') fetchProducts();
            if (target === 'contacts-view') fetchContacts();
        });
    });

    // ── Stats ────────────────────────────────────────────────────
    async function loadStats() {
        try {
            const [pRes, cRes] = await Promise.all([
                fetch(`${API_URL}/products?limit=1`),
                fetch(`${API_URL}/contact`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            const pData = await pRes.json();
            const cData = await cRes.json();

            const totalProducts = pData.count ?? 0;
            const contacts = cData.data || [];
            const unread = contacts.filter(c => !c.isRead).length;

            document.getElementById('stat-products').textContent = totalProducts;
            document.getElementById('stat-contacts').textContent = contacts.length;
            document.getElementById('stat-unread').textContent = unread;

            const badge = document.getElementById('unread-badge');
            if (unread > 0) {
                badge.textContent = unread;
                badge.style.display = 'inline';
            } else {
                badge.style.display = 'none';
            }
        } catch (_) { }
    }

    // ── Products ─────────────────────────────────────────────────
    async function fetchProducts() {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading products...</td></tr>';
        try {
            const res = await fetch(`${API_URL}/products?limit=200`);
            const data = await res.json();
            allProducts = data.data || [];
            document.getElementById('stat-products').textContent = data.count ?? allProducts.length;
            renderProducts();
        } catch {
            tbody.innerHTML = '<tr><td colspan="6" style="color:#e74c3c; text-align:center;">Failed to connect to backend. Is server running on port 5000?</td></tr>';
        }
    }

    function renderProducts() {
        if (!allProducts.length) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No products found. Add some!</td></tr>`;
            return;
        }
        tbody.innerHTML = allProducts.map(p => `
            <tr>
                <td><img src="${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.image}" alt="${p.name}" onerror="this.src='/images/card-choco.jpg'" style="width:50px;height:50px;object-fit:cover;border-radius:6px;"></td>
                <td style="font-weight:500;">${p.name}</td>
                <td><span style="background:rgba(201,168,76,0.2);color:#C9A84C;padding:3px 8px;border-radius:4px;font-size:0.78rem;font-weight:600;text-transform:uppercase;">${p.category}</span></td>
                <td style="font-weight:600;">₹${p.price}</td>
                <td>
                    <button class="btn-sm" style="background:${p.isAvailable ? 'rgba(46,213,115,0.2)' : 'rgba(255,152,0,0.2)'};color:${p.isAvailable ? '#2ed573' : '#ff9800'};border:none;cursor:pointer;" onclick="toggleAvailability('${p._id}', ${!p.isAvailable})">
                        ${p.isAvailable ? '✓ Available' : '✗ Sold Out'}
                    </button>
                    ${p.isFeatured ? '<span style="background:rgba(201,168,76,0.15);color:#C9A84C;padding:2px 7px;border-radius:4px;font-size:0.7rem;margin-left:4px;">★ Featured</span>' : ''}
                </td>
                <td>
                    <button class="btn-sm btn-edit" onclick="editProduct('${p._id}')">Edit</button>
                    <button class="btn-sm btn-delete" onclick="deleteProduct('${p._id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    window.editProduct = (id) => {
        editingId = id;
        const p = allProducts.find(x => x._id === id);
        if (!p) return;
        document.getElementById('modal-title').textContent = 'Edit Product';
        document.getElementById('p-name').value = p.name;
        document.getElementById('p-price').value = p.price;
        document.getElementById('p-category').value = p.category;
        document.getElementById('p-desc').value = p.description;
        document.getElementById('p-veg').checked = p.isVeg;
        document.getElementById('p-available').checked = p.isAvailable;
        document.getElementById('p-featured').checked = p.isFeatured;
        modal.style.display = 'flex';
    };

    window.toggleAvailability = async (id, newStatus) => {
        try {
            await fetch(`${API_URL}/products/${id}/availability`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ isAvailable: newStatus })
            });
            fetchProducts();
        } catch { alert('Update failed'); }
    };

    window.deleteProduct = async (id) => {
        if (!confirm('Delete this product permanently?')) return;
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProducts();
            else alert('Delete failed');
        } catch { alert('Network error'); }
    };

    // ── Contacts ─────────────────────────────────────────────────
    async function fetchContacts() {
        contactsBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading inquiries...</td></tr>';
        try {
            const res = await fetch(`${API_URL}/contact`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            allContacts = data.data || [];
            renderContacts();
            updateUnreadBadge();
        } catch {
            contactsBody.innerHTML = '<tr><td colspan="6" style="color:#e74c3c;text-align:center;">Failed to load inquiries.</td></tr>';
        }
    }

    function renderContacts() {
        if (!allContacts.length) {
            contactsBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No inquiries yet.</td></tr>';
            return;
        }
        contactsBody.innerHTML = allContacts.map(c => `
            <tr style="${!c.isRead ? 'background:rgba(201,168,76,0.05);' : ''}">
                <td style="font-size:0.85rem;color:#aaa;">${new Date(c.createdAt).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'})}</td>
                <td style="font-weight:${!c.isRead ? '600' : '400'};">${c.name} ${!c.isRead ? '<span style="background:#e74c3c;color:#fff;font-size:0.65rem;padding:2px 5px;border-radius:10px;margin-left:4px;">NEW</span>' : ''}</td>
                <td><a href="tel:${c.phone}" style="color:var(--gold-primary);">${c.phone}</a></td>
                <td style="max-width:220px;font-size:0.88rem;">${c.message}</td>
                <td style="font-size:0.82rem;color:#aaa;">${c.email || '—'}</td>
                <td style="white-space:nowrap;">
                    ${!c.isRead ? `<button class="btn-sm btn-read" onclick="markRead('${c._id}')">✓ Mark Read</button>` : ''}
                    <button class="btn-sm btn-delete" onclick="deleteContact('${c._id}')" style="margin-left:4px;">✕</button>
                </td>
            </tr>
        `).join('');
    }

    function updateUnreadBadge() {
        const unread = allContacts.filter(c => !c.isRead).length;
        document.getElementById('stat-unread').textContent = unread;
        const badge = document.getElementById('unread-badge');
        if (unread > 0) { badge.textContent = unread; badge.style.display = 'inline'; }
        else badge.style.display = 'none';
    }

    window.markRead = async (id) => {
        try {
            await fetch(`${API_URL}/contact/${id}/read`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchContacts();
        } catch { alert('Failed to mark as read'); }
    };

    window.deleteContact = async (id) => {
        if (!confirm('Delete this inquiry?')) return;
        try {
            await fetch(`${API_URL}/contact/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchContacts();
        } catch { }
    };

    // Also update contacts table header to add Email column
    const contactsThead = document.querySelector('#contacts-view thead tr');
    if (contactsThead && contactsThead.children.length === 5) {
        const emailTh = document.createElement('th');
        emailTh.textContent = 'Email';
        contactsThead.insertBefore(emailTh, contactsThead.children[4]);
    }

    // ── Modal ────────────────────────────────────────────────────
    addModalBtn.onclick = () => {
        editingId = null;
        document.getElementById('modal-title').textContent = 'Add Product';
        form.reset();
        modal.style.display = 'flex';
    };

    closeModalBtn.onclick = () => modal.style.display = 'none';

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Saving...';
        btn.disabled = true;

        try {
            const formData = new FormData();
            formData.append('name', document.getElementById('p-name').value);
            formData.append('price', document.getElementById('p-price').value);
            formData.append('category', document.getElementById('p-category').value);
            formData.append('description', document.getElementById('p-desc').value);
            formData.append('isVeg', document.getElementById('p-veg').checked);
            formData.append('isAvailable', document.getElementById('p-available').checked);
            formData.append('isFeatured', document.getElementById('p-featured').checked);

            const fileInput = document.getElementById('p-image');
            if (fileInput.files[0]) {
                formData.append('image', fileInput.files[0]);
            } else if (!editingId) {
                alert('Please upload an image for the new product');
                btn.textContent = 'Save Product';
                btn.disabled = false;
                return;
            }

            const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                modal.style.display = 'none';
                fetchProducts();
                loadStats();
                form.reset();
            } else {
                const errData = await response.json();
                alert('Error: ' + (errData.error || 'Failed to save'));
            }
        } catch {
            alert('Network error. Backend might be down.');
        } finally {
            btn.textContent = 'Save Product';
            btn.disabled = false;
        }
    };

    // ── Change Password ──────────────────────────────────────────
    const changePwForm = document.getElementById('change-pw-form');
    if (changePwForm) {
        changePwForm.onsubmit = async (e) => {
            e.preventDefault();
            const newPw = document.getElementById('new-password').value;
            const confirmPw = document.getElementById('confirm-password').value;
            const successEl = document.getElementById('pw-success');
            const errorEl = document.getElementById('pw-error');
            successEl.style.display = 'none';
            errorEl.style.display = 'none';

            if (newPw !== confirmPw) {
                errorEl.textContent = 'Passwords do not match!';
                errorEl.style.display = 'block';
                return;
            }

            try {
                const res = await fetch(`${API_URL}/admin/change-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ newPassword: newPw })
                });
                const data = await res.json();
                if (res.ok) {
                    successEl.style.display = 'block';
                    changePwForm.reset();
                } else {
                    errorEl.textContent = data.message || 'Failed to update password';
                    errorEl.style.display = 'block';
                }
            } catch {
                errorEl.textContent = 'Network error. Backend might be down.';
                errorEl.style.display = 'block';
            }
        };
    }

    // ── Logout ───────────────────────────────────────────────────
    logoutBtn.onclick = () => {
        if (confirm('Logout from admin panel?')) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin.html';
        }
    };

    // ── Init ─────────────────────────────────────────────────────
    loadStats();
    fetchProducts();
});
