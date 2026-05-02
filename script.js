// ========== Product Data ==========
const productAmounts = {
    'Visa Prepaid Card': ['$25', '$50', '$100', '$200'],
    'Visa Gold Card': ['$200', '$500', '$1000'],
    'iTunes Gift Card (US)': ['$10', '$25', '$50', '$100'],
    'iTunes Gift Card (UK/EU)': ['£10', '£25', '£50', '€25', '€50'],
    'Google Play Card': ['$10', '$25', '$50', '$100'],
    'Amazon Gift Card': ['$25', '$50', '$100', '$200'],
    'Steam Wallet Card': ['$20', '$50', '$100'],
    'Netflix Gift Card': ['$25', '$50', '$100'],
    'Mobile Legends Diamonds': ['86 Dias', '172 Dias', '257 Dias', '706 Dias', '2195 Dias'],
    'PUBG Mobile UC': ['60 UC', '325 UC', '660 UC', '1800 UC', '8100 UC'],
};

// Price mapping for game top-up & non-dollar items (USD equivalent)
const priceMap = {
    '86 Dias': 1.50, '172 Dias': 3.00, '257 Dias': 4.50, '706 Dias': 12.00, '2195 Dias': 37.00,
    '60 UC': 1.00, '325 UC': 5.00, '660 UC': 10.00, '1800 UC': 25.00, '8100 UC': 100.00,
    '£10': 13, '£25': 32, '£50': 64, '€25': 28, '€50': 55,
};

// ========== Google Login Config ==========
const GOOGLE_CLIENT_ID = '532476476244-1inc1qcsa6bqgmlt31ofa235ct0392nb.apps.googleusercontent.com';

// ========== User System ==========
let currentUser = JSON.parse(localStorage.getItem('aac_user') || 'null');

function handleGoogleLogin(response) {
    // Decode JWT token from Google
    const payload = JSON.parse(atob(response.credential.split('.')[1]));

    currentUser = {
        googleId: payload.sub,
        username: payload.email,
        displayName: payload.name,
        photoUrl: payload.picture || '',
        balance: 0,
        orders: [],
        deposits: [],
        joinedAt: new Date().toISOString()
    };

    // Check if returning user (restore balance & history)
    const saved = localStorage.getItem('aac_user_' + currentUser.googleId);
    if (saved) {
        const savedData = JSON.parse(saved);
        currentUser.balance = savedData.balance || 0;
        currentUser.orders = savedData.orders || [];
        currentUser.deposits = savedData.deposits || [];
        currentUser.joinedAt = savedData.joinedAt || currentUser.joinedAt;
    }

    saveUser();
    initApp();
}

function saveUser() {
    if (!currentUser) return;
    localStorage.setItem('aac_user', JSON.stringify(currentUser));
    if (currentUser.googleId) {
        localStorage.setItem('aac_user_' + currentUser.googleId, JSON.stringify(currentUser));
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('aac_user');
    location.reload();
}

function initApp() {
    if (!currentUser) {
        document.getElementById('loginScreen').classList.remove('hidden');
        initGoogleLogin();
        return;
    }
    document.getElementById('loginScreen').classList.add('hidden');
    updateBalanceUI();
    updateUserUI();
}

function initGoogleLogin() {
    if (typeof google === 'undefined') {
        setTimeout(initGoogleLogin, 200);
        return;
    }
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin
    });
    google.accounts.id.renderButton(document.getElementById('googleLoginBtn'), {
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        width: 300,
        text: 'signin_with'
    });
}

function updateBalanceUI() {
    if (!currentUser) return;
    const formatted = '$' + currentUser.balance.toFixed(2);
    document.getElementById('balanceDisplay').textContent = formatted;
    document.getElementById('dropdownBalance').textContent = formatted;
}

function updateUserUI() {
    if (!currentUser) return;
    const initial = currentUser.displayName.charAt(0).toUpperCase();
    const avatarEl = document.getElementById('userAvatar');
    const avatarLgEl = document.getElementById('userAvatarLg');

    if (currentUser.photoUrl) {
        avatarEl.innerHTML = `<img src="${currentUser.photoUrl}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        avatarLgEl.innerHTML = `<img src="${currentUser.photoUrl}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
        avatarEl.textContent = initial;
        avatarLgEl.textContent = initial;
    }

    document.getElementById('dropdownName').textContent = currentUser.displayName;
    document.getElementById('dropdownUsername').textContent = currentUser.username;
}

// ========== User Dropdown ==========
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

function closeUserDropdown() {
    document.getElementById('userDropdown').classList.remove('active');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('userMenu');
    if (menu && !menu.contains(e.target)) {
        closeUserDropdown();
    }
});

// ========== Filter Products ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========== Order Modal ==========
const orderModal = document.getElementById('orderModal');
let currentStep = 1;
let selectedProduct = '';
let selectedAmount = '';
let selectedPrice = 0;

function getPrice(amount) {
    if (priceMap[amount]) return priceMap[amount];
    // Parse dollar amounts
    const match = amount.match(/\$(\d+)/);
    if (match) return parseInt(match[1]);
    return 0;
}

function openOrder(productName) {
    if (!currentUser) return;

    selectedProduct = productName;
    selectedAmount = '';
    selectedPrice = 0;
    currentStep = 1;

    document.getElementById('modalProductName').textContent = productName;

    const grid = document.getElementById('amountGrid');
    const amounts = productAmounts[productName] || [];
    grid.innerHTML = amounts.map(amt => {
        const price = getPrice(amt);
        const priceLabel = price ? ` <small style="opacity:0.7">($${price})</small>` : '';
        return `<div class="amount-option" onclick="selectAmount(this, '${amt}')">${amt}${priceLabel}</div>`;
    }).join('');

    document.getElementById('modalBalance').textContent = '$' + currentUser.balance.toFixed(2);

    updateOrderStepUI();
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function selectAmount(el, amount) {
    document.querySelectorAll('#amountGrid .amount-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedAmount = amount;
    selectedPrice = getPrice(amount);
}

function goToStep(step) {
    if (step === 2) {
        if (!selectedAmount) {
            shakeElement(document.getElementById('amountGrid'));
            return;
        }

        document.getElementById('summaryProduct').textContent = selectedProduct;
        document.getElementById('summaryAmount').textContent = selectedAmount;
        document.getElementById('summaryPrice').textContent = '$' + selectedPrice.toFixed(2);
        document.getElementById('summaryBalance').textContent = '$' + currentUser.balance.toFixed(2);

        const remaining = currentUser.balance - selectedPrice;
        document.getElementById('summaryRemaining').textContent = '$' + remaining.toFixed(2);

        const insufficient = remaining < 0;
        document.getElementById('insufficientWarning').style.display = insufficient ? 'flex' : 'none';
        document.getElementById('confirmPurchaseBtn').style.display = insufficient ? 'none' : '';
        document.getElementById('addFundsInsteadBtn').style.display = insufficient ? '' : 'none';

        if (remaining < 0) {
            document.getElementById('summaryRemaining').style.color = '#EF4444';
        } else {
            document.getElementById('summaryRemaining').style.color = '#10B981';
        }
    }

    currentStep = step;
    updateOrderStepUI();
}

function updateOrderStepUI() {
    document.querySelectorAll('#orderModal .modal-step').forEach(s => s.classList.remove('active'));

    const stepEl = document.getElementById('step' + currentStep);
    if (stepEl) stepEl.classList.add('active');

    const dots = document.querySelectorAll('#orderModal .step-dot');
    const lines = document.querySelectorAll('#orderModal .step-line');

    dots.forEach((dot, i) => {
        const stepNum = i + 1;
        dot.classList.remove('active', 'done');
        if (stepNum === currentStep) dot.classList.add('active');
        else if (stepNum < currentStep) dot.classList.add('done');
    });

    lines.forEach((line, i) => {
        line.classList.toggle('done', i + 1 < currentStep);
    });
}

function confirmPurchase() {
    if (!currentUser || selectedPrice <= 0) return;
    if (currentUser.balance < selectedPrice) return;

    // Deduct balance
    currentUser.balance -= selectedPrice;
    currentUser.balance = Math.round(currentUser.balance * 100) / 100;

    // Save order
    const order = {
        id: 'ORD-' + Date.now().toString(36).toUpperCase(),
        product: selectedProduct,
        amount: selectedAmount,
        price: selectedPrice,
        date: new Date().toISOString(),
        status: 'processing'
    };
    currentUser.orders.unshift(order);
    saveUser();
    updateBalanceUI();

    // Show success
    document.querySelectorAll('#orderModal .modal-step').forEach(s => s.classList.remove('active'));
    document.getElementById('stepSuccess').classList.add('active');

    document.querySelectorAll('#orderModal .step-dot').forEach(d => {
        d.classList.remove('active');
        d.classList.add('done');
    });
    document.querySelectorAll('#orderModal .step-line').forEach(l => l.classList.add('done'));
}

function closeOrder() {
    orderModal.classList.remove('active');
    document.body.style.overflow = '';
}

orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) closeOrder();
});

// ========== Add Funds Modal ==========
const addFundsModal = document.getElementById('addFundsModal');
let depositAmount = 0;
let fundsCurrentStep = 1;

function openAddFunds() {
    if (!currentUser) return;

    depositAmount = 0;
    fundsCurrentStep = 1;

    document.getElementById('fundsCurrentBalance').textContent = '$' + currentUser.balance.toFixed(2);
    document.getElementById('customDepositAmount').value = '';
    document.getElementById('fundsTxHash').value = '';

    document.querySelectorAll('.deposit-amount-grid .amount-option').forEach(o => o.classList.remove('selected'));

    updateFundsStepUI();
    addFundsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function selectDeposit(el, amount) {
    document.querySelectorAll('.deposit-amount-grid .amount-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    depositAmount = amount;
    document.getElementById('customDepositAmount').value = '';
}

function goToFundsStep(step) {
    if (step === 2) {
        const custom = parseFloat(document.getElementById('customDepositAmount').value);
        if (custom > 0) depositAmount = custom;

        if (!depositAmount || depositAmount <= 0) {
            shakeElement(document.querySelector('.deposit-amount-grid'));
            return;
        }

        document.getElementById('fundsSummaryAmount').textContent = '$' + depositAmount.toFixed(2);
    }

    if (step === 3) {
        // no extra validation
    }

    fundsCurrentStep = step;
    updateFundsStepUI();
}

function updateFundsStepUI() {
    document.querySelectorAll('#addFundsModal .modal-step').forEach(s => s.classList.remove('active'));
    const stepEl = document.getElementById('fundsStep' + fundsCurrentStep);
    if (stepEl) stepEl.classList.add('active');
}

function submitDeposit() {
    const txHash = document.getElementById('fundsTxHash').value.trim();
    if (!txHash) {
        shakeElement(document.getElementById('fundsTxHash'));
        document.getElementById('fundsTxHash').focus();
        return;
    }

    // Save deposit record as pending (admin must approve)
    const deposit = {
        id: 'DEP-' + Date.now().toString(36).toUpperCase(),
        amount: depositAmount,
        txHash: txHash,
        date: new Date().toISOString(),
        status: 'pending',
        userId: currentUser.googleId,
        userName: currentUser.displayName,
        userEmail: currentUser.username
    };
    currentUser.deposits.unshift(deposit);
    saveUser();

    // Also save to global pending deposits for admin
    const allDeposits = JSON.parse(localStorage.getItem('aac_all_deposits') || '[]');
    allDeposits.unshift(deposit);
    localStorage.setItem('aac_all_deposits', JSON.stringify(allDeposits));

    // Show success
    document.getElementById('fundsSuccessAmount').textContent = '$' + depositAmount.toFixed(2);
    document.querySelectorAll('#addFundsModal .modal-step').forEach(s => s.classList.remove('active'));
    document.getElementById('fundsSuccess').classList.add('active');
}

function closeAddFunds() {
    addFundsModal.classList.remove('active');
    document.body.style.overflow = '';
}

addFundsModal.addEventListener('click', (e) => {
    if (e.target === addFundsModal) closeAddFunds();
});

function copyFundsAddress() {
    const address = document.getElementById('fundsWalletAddress').textContent;
    navigator.clipboard.writeText(address).then(() => {
        const btn = document.querySelector('#addFundsModal .copy-btn');
        if (!btn) return;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
    });
}

// ========== Order History ==========
const orderHistoryModal = document.getElementById('orderHistoryModal');

function openOrderHistory() {
    if (!currentUser) return;

    const list = document.getElementById('orderHistoryList');

    if (!currentUser.orders || currentUser.orders.length === 0) {
        list.innerHTML = '<p class="empty-history">No orders yet. Start shopping!</p>';
    } else {
        list.innerHTML = currentUser.orders.map(order => {
            const date = new Date(order.date).toLocaleDateString();
            const statusClass = order.status === 'processing' ? 'status-pending' : 'status-done';
            return `
                <div class="history-item">
                    <div class="history-item-left">
                        <strong>${order.product}</strong>
                        <small>${order.amount} &middot; ${date}</small>
                    </div>
                    <div class="history-item-right">
                        <span class="history-price">-$${order.price.toFixed(2)}</span>
                        <span class="history-status ${statusClass}">${order.status}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    orderHistoryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderHistory() {
    orderHistoryModal.classList.remove('active');
    document.body.style.overflow = '';
}

orderHistoryModal.addEventListener('click', (e) => {
    if (e.target === orderHistoryModal) closeOrderHistory();
});

// ========== Edit Profile ==========
const editProfileModal = document.getElementById('editProfileModal');

function openEditProfile() {
    if (!currentUser) return;
    document.getElementById('profileUsername').value = currentUser.displayName || '';
    document.getElementById('profileBirthday').value = currentUser.birthday || '';
    document.getElementById('profileTelegram').value = currentUser.telegram || '';
    document.getElementById('profileViber').value = currentUser.viber || '';
    document.getElementById('profileWhatsApp').value = currentUser.whatsapp || '';
    editProfileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditProfile() {
    editProfileModal.classList.remove('active');
    document.body.style.overflow = '';
}

function saveProfile(e) {
    e.preventDefault();
    if (!currentUser) return;

    currentUser.displayName = document.getElementById('profileUsername').value.trim() || currentUser.displayName;
    currentUser.birthday = document.getElementById('profileBirthday').value;
    currentUser.telegram = document.getElementById('profileTelegram').value.trim();
    currentUser.viber = document.getElementById('profileViber').value.trim();
    currentUser.whatsapp = document.getElementById('profileWhatsApp').value.trim();

    saveUser();
    updateUserUI();
    closeEditProfile();
}

editProfileModal.addEventListener('click', (e) => {
    if (e.target === editProfileModal) closeEditProfile();
});

// ========== Shake Animation ==========
function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => el.style.animation = '', 400);
}

// ========== Mobile Menu ==========
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

function closeMobileNav() {
    mobileNav.classList.remove('active');
}

// ========== Scroll Header Shadow ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ========== Close all modals on Escape ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOrder();
        closeAddFunds();
        closeOrderHistory();
        closeEditProfile();
    }
});

// ========== Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
`;
document.head.appendChild(style);

// ========== Init ==========
initApp();
