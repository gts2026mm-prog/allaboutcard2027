// ========== Sample Data ==========
const ADMIN_CREDS = { username: 'admin', password: 'admin123' };

let orders = [
    { id: 'ORD-001', customer: 'Ko Zaw', contact: '@kozaw_mm', product: 'iTunes Gift Card (US)', amount: '$50', txHash: '0x8f3a...b2c1', status: 'completed', date: '2026-04-23' },
    { id: 'ORD-002', customer: 'Ma Hla', contact: 'mahla@gmail.com', product: 'Visa Prepaid Card', amount: '$100', txHash: '0x1d4e...a7f3', status: 'completed', date: '2026-04-23' },
    { id: 'ORD-003', customer: 'Aung Ko', contact: '@aungko99', product: 'Google Play Card', amount: '$25', txHash: '0x6b2c...d4e8', status: 'confirmed', date: '2026-04-22' },
    { id: 'ORD-004', customer: 'Su Mon', contact: '@sumon_card', product: 'Steam Wallet Card', amount: '$50', txHash: '0xaa12...ff90', status: 'confirmed', date: '2026-04-22' },
    { id: 'ORD-005', customer: 'Ye Wint', contact: 'yewint@mail.com', product: 'Netflix Gift Card', amount: '$25', txHash: '', status: 'pending', date: '2026-04-22' },
    { id: 'ORD-006', customer: 'Nay Chi', contact: '@naychi_mm', product: 'iTunes Gift Card (US)', amount: '$100', txHash: '0x3f7d...c1b5', status: 'completed', date: '2026-04-21' },
    { id: 'ORD-007', customer: 'Min Thu', contact: '@minthu', product: 'Amazon Gift Card', amount: '$200', txHash: '', status: 'pending', date: '2026-04-21' },
    { id: 'ORD-008', customer: 'Phyo Wai', contact: 'phyowai@gmail.com', product: 'Visa Gold Card', amount: '$500', txHash: '0x9e2a...b8d4', status: 'completed', date: '2026-04-20' },
    { id: 'ORD-009', customer: 'Htet Aung', contact: '@htetaung', product: 'iTunes Gift Card (UK/EU)', amount: '£50', txHash: '0x5c3d...e9a1', status: 'completed', date: '2026-04-20' },
    { id: 'ORD-010', customer: 'Thet Naing', contact: '@thetnaing', product: 'Visa Prepaid Card', amount: '$25', txHash: '', status: 'cancelled', date: '2026-04-19' },
    { id: 'ORD-011', customer: 'Ko Zaw', contact: '@kozaw_mm', product: 'Google Play Card', amount: '$50', txHash: '0x7a8b...f2c3', status: 'completed', date: '2026-04-19' },
    { id: 'ORD-012', customer: 'Wai Yan', contact: 'waiyan@gmail.com', product: 'Steam Wallet Card', amount: '$100', txHash: '0xbb44...d6e7', status: 'completed', date: '2026-04-18' },
    { id: 'ORD-013', customer: 'Ma Hla', contact: 'mahla@gmail.com', product: 'Netflix Gift Card', amount: '$50', txHash: '0xcc55...a3b2', status: 'completed', date: '2026-04-18' },
    { id: 'ORD-014', customer: 'Kyaw Soe', contact: '@kyawsoe', product: 'Amazon Gift Card', amount: '$100', txHash: '0xdd66...c4d5', status: 'completed', date: '2026-04-17' },
    { id: 'ORD-015', customer: 'Aung Ko', contact: '@aungko99', product: 'iTunes Gift Card (US)', amount: '$25', txHash: '', status: 'pending', date: '2026-04-17' },
    { id: 'ORD-016', customer: 'Su Mon', contact: '@sumon_card', product: 'Visa Prepaid Card', amount: '$200', txHash: '0xee77...b5c6', status: 'completed', date: '2026-04-16' },
    { id: 'ORD-017', customer: 'Nay Chi', contact: '@naychi_mm', product: 'Google Play Card', amount: '$100', txHash: '0xff88...a6b7', status: 'completed', date: '2026-04-16' },
    { id: 'ORD-018', customer: 'Lin Htet', contact: '@linhtet', product: 'Visa Gold Card', amount: '$200', txHash: '', status: 'pending', date: '2026-04-15' },
    { id: 'ORD-019', customer: 'Ye Wint', contact: 'yewint@mail.com', product: 'iTunes Gift Card (US)', amount: '$50', txHash: '0x1199...c7d8', status: 'completed', date: '2026-04-15' },
    { id: 'ORD-020', customer: 'Ko Zaw', contact: '@kozaw_mm', product: 'Amazon Gift Card', amount: '$50', txHash: '0x22aa...d8e9', status: 'completed', date: '2026-04-14' },
    { id: 'ORD-021', customer: 'Min Thu', contact: '@minthu', product: 'Visa Prepaid Card', amount: '$50', txHash: '0x33bb...e9f0', status: 'completed', date: '2026-04-14' },
    { id: 'ORD-022', customer: 'Phyo Wai', contact: 'phyowai@gmail.com', product: 'Steam Wallet Card', amount: '$20', txHash: '0x44cc...f0a1', status: 'completed', date: '2026-04-13' },
    { id: 'ORD-023', customer: 'Htet Aung', contact: '@htetaung', product: 'Netflix Gift Card', amount: '$100', txHash: '0x55dd...a1b2', status: 'completed', date: '2026-04-13' },
    { id: 'ORD-024', customer: 'Wai Yan', contact: 'waiyan@gmail.com', product: 'iTunes Gift Card (UK/EU)', amount: '€50', txHash: '0x66ee...b2c3', status: 'completed', date: '2026-04-12' },
];

let products = [
    { id: 1, name: 'Visa Prepaid Card', category: 'visa', prices: ['$25', '$50', '$100', '$200'], stock: 150, status: 'active' },
    { id: 2, name: 'Visa Gold Card', category: 'visa', prices: ['$200', '$500', '$1000'], stock: 50, status: 'active' },
    { id: 3, name: 'iTunes Gift Card (US)', category: 'itunes', prices: ['$10', '$25', '$50', '$100'], stock: 200, status: 'active' },
    { id: 4, name: 'iTunes Gift Card (UK/EU)', category: 'itunes', prices: ['£10', '£25', '£50', '€25', '€50'], stock: 80, status: 'active' },
    { id: 5, name: 'Google Play Card', category: 'gift', prices: ['$10', '$25', '$50', '$100'], stock: 120, status: 'active' },
    { id: 6, name: 'Amazon Gift Card', category: 'gift', prices: ['$25', '$50', '$100', '$200'], stock: 100, status: 'active' },
    { id: 7, name: 'Steam Wallet Card', category: 'gift', prices: ['$20', '$50', '$100'], stock: 90, status: 'active' },
    { id: 8, name: 'Netflix Gift Card', category: 'gift', prices: ['$25', '$50', '$100'], stock: 75, status: 'active' },
];

// ========== Login ==========
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    if (user === ADMIN_CREDS.username && pass === ADMIN_CREDS.password) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        localStorage.setItem('adminLoggedIn', 'true');
        renderAll();
    } else {
        showToast('Invalid credentials', 'error');
    }
}

function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
}

// Auto-login check
if (localStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    renderAll();
}

// ========== Page Navigation ==========
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(item.dataset.page);
    });
});

function switchPage(pageName) {
    // Update nav
    navItems.forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    // Update pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageName}`).classList.add('active');

    // Update title
    const titles = { overview: 'Overview', orders: 'Orders', products: 'Products', customers: 'Customers', settings: 'Settings' };
    document.getElementById('pageTitle').textContent = titles[pageName] || pageName;

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

// ========== Mobile Sidebar ==========
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
});

document.getElementById('sidebarClose').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
});

// ========== Render All ==========
function renderAll() {
    renderStats();
    renderRecentOrders();
    renderOrders();
    renderProducts();
    renderCustomers();
}

// ========== Stats ==========
function renderStats() {
    document.getElementById('statOrders').textContent = orders.length;
    document.getElementById('statProducts').textContent = products.length;

    // Revenue (count completed orders)
    let revenue = 0;
    orders.forEach(o => {
        if (o.status === 'completed') {
            const num = parseFloat(o.amount.replace(/[^0-9.]/g, ''));
            if (!isNaN(num)) revenue += num;
        }
    });
    document.getElementById('statRevenue').textContent = '$' + revenue.toLocaleString();

    // Unique customers
    const uniqueCustomers = new Set(orders.map(o => o.customer));
    document.getElementById('statCustomers').textContent = uniqueCustomers.size;
}

// ========== Recent Orders (Overview) ==========
function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    tbody.innerHTML = orders.slice(0, 5).map(o => `
        <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.customer}</td>
            <td>${o.product}</td>
            <td>${o.amount}</td>
            <td><span class="badge badge-${o.status}">${capitalize(o.status)}</span></td>
            <td>${o.date}</td>
        </tr>
    `).join('');
}

// ========== All Orders ==========
function renderOrders() {
    const filter = document.getElementById('orderFilter').value;
    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    const tbody = document.getElementById('ordersBody');

    tbody.innerHTML = filtered.map(o => `
        <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.customer}</td>
            <td>${o.product}</td>
            <td>${o.amount}</td>
            <td style="font-size:0.8rem;color:var(--text-muted);">${o.txHash || '—'}</td>
            <td><span class="badge badge-${o.status}">${capitalize(o.status)}</span></td>
            <td>${o.date}</td>
            <td>
                <div class="actions-cell">
                    <button class="action-btn" title="View" onclick="viewOrder('${o.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    ${o.status === 'pending' ? `
                    <button class="action-btn" title="Confirm" onclick="updateOrderStatus('${o.id}','confirmed')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                    </button>` : ''}
                    ${o.status === 'confirmed' ? `
                    <button class="action-btn" title="Complete" onclick="updateOrderStatus('${o.id}','completed')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    </button>` : ''}
                    ${o.status === 'pending' ? `
                    <button class="action-btn danger" title="Cancel" onclick="updateOrderStatus('${o.id}','cancelled')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

function viewOrder(id) {
    const o = orders.find(x => x.id === id);
    if (!o) return;

    document.getElementById('orderDetailContent').innerHTML = `
        <div class="detail-row"><span class="detail-label">Order ID</span><span class="detail-value">${o.id}</span></div>
        <div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${o.customer}</span></div>
        <div class="detail-row"><span class="detail-label">Contact</span><span class="detail-value">${o.contact}</span></div>
        <div class="detail-row"><span class="detail-label">Product</span><span class="detail-value">${o.product}</span></div>
        <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">${o.amount}</span></div>
        <div class="detail-row"><span class="detail-label">TX Hash</span><span class="detail-value">${o.txHash || 'Not provided'}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge badge-${o.status}">${capitalize(o.status)}</span></span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${o.date}</span></div>
        <div class="detail-actions">
            ${o.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="updateOrderStatus('${o.id}','confirmed');closeOrderDetail();">Confirm</button>` : ''}
            ${o.status === 'confirmed' ? `<button class="btn btn-primary btn-sm" onclick="updateOrderStatus('${o.id}','completed');closeOrderDetail();">Complete</button>` : ''}
            ${o.status === 'pending' ? `<button class="btn btn-outline btn-sm" style="color:var(--danger);" onclick="updateOrderStatus('${o.id}','cancelled');closeOrderDetail();">Cancel</button>` : ''}
        </div>
    `;
    document.getElementById('orderDetailModal').classList.add('active');
}

function closeOrderDetail() {
    document.getElementById('orderDetailModal').classList.remove('active');
}

function updateOrderStatus(id, status) {
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        renderAll();
        showToast(`Order ${id} marked as ${status}`, 'success');
    }
}

// ========== Products ==========
function renderProducts() {
    const tbody = document.getElementById('productsBody');
    const categoryNames = { visa: 'Visa Cards', itunes: 'iTunes', gift: 'Gift Cards' };

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td>${categoryNames[p.category] || p.category}</td>
            <td>${p.prices.join(', ')}</td>
            <td>${p.stock}</td>
            <td><span class="badge badge-${p.status}">${capitalize(p.status)}</span></td>
            <td>
                <div class="actions-cell">
                    <button class="action-btn" title="Edit" onclick="editProduct(${p.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="action-btn danger" title="Delete" onclick="deleteProduct(${p.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

let editingProductId = null;

function openProductModal(id) {
    editingProductId = id || null;
    document.getElementById('productModalTitle').textContent = id ? 'Edit Product' : 'Add Product';

    if (id) {
        const p = products.find(x => x.id === id);
        document.getElementById('prodName').value = p.name;
        document.getElementById('prodCategory').value = p.category;
        document.getElementById('prodPrices').value = p.prices.join(', ');
        document.getElementById('prodStock').value = p.stock;
    } else {
        document.getElementById('prodName').value = '';
        document.getElementById('prodCategory').value = 'visa';
        document.getElementById('prodPrices').value = '';
        document.getElementById('prodStock').value = 100;
    }

    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
}

function saveProduct(e) {
    e.preventDefault();
    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const prices = document.getElementById('prodPrices').value.split(',').map(s => s.trim()).filter(Boolean);
    const stock = parseInt(document.getElementById('prodStock').value);

    if (editingProductId) {
        const p = products.find(x => x.id === editingProductId);
        p.name = name;
        p.category = category;
        p.prices = prices;
        p.stock = stock;
        showToast('Product updated', 'success');
    } else {
        const newId = Math.max(...products.map(p => p.id)) + 1;
        products.push({ id: newId, name, category, prices, stock, status: 'active' });
        showToast('Product added', 'success');
    }

    closeProductModal();
    renderProducts();
    renderStats();
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        renderProducts();
        renderStats();
        showToast('Product deleted', 'success');
    }
}

// ========== Customers ==========
function renderCustomers() {
    const customerMap = {};
    orders.forEach(o => {
        if (!customerMap[o.customer]) {
            customerMap[o.customer] = { name: o.customer, contact: o.contact, orders: 0, spent: 0, lastOrder: o.date };
        }
        customerMap[o.customer].orders++;
        if (o.status === 'completed') {
            const num = parseFloat(o.amount.replace(/[^0-9.]/g, ''));
            if (!isNaN(num)) customerMap[o.customer].spent += num;
        }
        if (o.date > customerMap[o.customer].lastOrder) {
            customerMap[o.customer].lastOrder = o.date;
        }
    });

    const customers = Object.values(customerMap).sort((a, b) => b.spent - a.spent);
    const tbody = document.getElementById('customersBody');

    tbody.innerHTML = customers.map(c => `
        <tr>
            <td><strong>${c.name}</strong></td>
            <td style="color:var(--text-muted);">${c.contact}</td>
            <td>${c.orders}</td>
            <td>$${c.spent.toLocaleString()}</td>
            <td>${c.lastOrder}</td>
        </tr>
    `).join('');
}

// ========== Settings ==========
function saveSettings() {
    showToast('Settings saved successfully', 'success');
}

function changePassword() {
    const current = document.getElementById('currentPass').value;
    const newP = document.getElementById('newPass').value;
    const confirm = document.getElementById('confirmPass').value;

    if (current !== ADMIN_CREDS.password) {
        showToast('Current password is incorrect', 'error');
        return;
    }
    if (newP.length < 6) {
        showToast('New password must be at least 6 characters', 'error');
        return;
    }
    if (newP !== confirm) {
        showToast('Passwords do not match', 'error');
        return;
    }

    ADMIN_CREDS.password = newP;
    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmPass').value = '';
    showToast('Password updated successfully', 'success');
}

// ========== Toast ==========
function showToast(message, type = '') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

// ========== Helpers ==========
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            editingProductId = null;
        }
    });
});

// Close modals on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        editingProductId = null;
    }
});
