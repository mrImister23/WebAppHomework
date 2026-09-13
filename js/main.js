// Main Application Logic & Shared State
// Apex Hypermotors

const WALLET_STORAGE_KEY = 'APEX_SUPERCAR_WALLET_BALANCE';
const DEFAULT_FAKE_BALANCE = 999999999999999;
const CURRENT_ORDER_KEY = 'APEX_CURRENT_ORDER';

// Initialize and get fake wallet balance
function getWalletBalance() {
  const stored = localStorage.getItem(WALLET_STORAGE_KEY);
  if (stored === null || isNaN(Number(stored))) {
    localStorage.setItem(WALLET_STORAGE_KEY, DEFAULT_FAKE_BALANCE.toString());
    return DEFAULT_FAKE_BALANCE;
  }
  return Number(stored);
}

function updateWalletBalance(newBalance) {
  localStorage.setItem(WALLET_STORAGE_KEY, newBalance.toString());
  updateNavbarWalletDisplay();
}

function resetWalletBalance() {
  localStorage.setItem(WALLET_STORAGE_KEY, DEFAULT_FAKE_BALANCE.toString());
  updateNavbarWalletDisplay();
  showToast("App Pocket Money has been reset to $999,999,999,999,999!", "success");
}

// Format numbers nicely as currency
function formatCurrency(num) {
  return '$' + Number(num).toLocaleString('en-US');
}

// Update navbar wallet display
function updateNavbarWalletDisplay() {
  const badge = document.getElementById('navbar-wallet-amount');
  if (badge) {
    const balance = getWalletBalance();
    // Display full value or formatted shorthand with title tooltip
    badge.textContent = formatCurrency(balance);
    badge.setAttribute('title', `Available App Pocket Money: ${formatCurrency(balance)}`);
  }
}

// Toast notification
function showToast(message, type = 'info') {
  let toastEl = document.getElementById('apex-global-toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'apex-global-toast';
    toastEl.className = 'apex-toast';
    document.body.appendChild(toastEl);
  }

  const iconClass = type === 'success' ? 'fa-check-circle text-success' :
                    type === 'danger' ? 'fa-exclamation-triangle text-danger' :
                    'fa-bolt text-warning';

  toastEl.innerHTML = `
    <i class="fas ${iconClass} fa-lg"></i>
    <span>${message}</span>
  `;
  toastEl.classList.add('show');

  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 4000);
}

// Global Order Modal State
let selectedOrderCar = null;
let selectedColor = null;
let selectedPaymentMethod = 'pocket-money'; // default: 'pocket-money' or 'credit-card'

// Open the Order Modal for any car
function openOrderModal(carId) {
  const car = getCarById(carId);
  if (!car) return;

  selectedOrderCar = car;
  selectedColor = car.colors[0];
  selectedPaymentMethod = 'pocket-money';

  const modalEl = document.getElementById('apexOrderModal');
  if (!modalEl) {
    // If modal not on page, redirect to order.html with car id
    window.location.href = `order.html?id=${encodeURIComponent(carId)}`;
    return;
  }

  // Populate Modal Fields
  document.getElementById('modal-car-name').textContent = car.name;
  document.getElementById('modal-car-brand').textContent = car.brand;
  document.getElementById('modal-car-price').textContent = formatCurrency(car.price);
  document.getElementById('modal-car-img').src = car.image;
  document.getElementById('modal-car-speed').textContent = car.topSpeed;
  document.getElementById('modal-car-accel').textContent = car.acceleration;
  document.getElementById('modal-car-hp').textContent = car.horsepower;

  // Render Color Options
  const colorContainer = document.getElementById('modal-color-options');
  colorContainer.innerHTML = '';
  car.colors.forEach((color, idx) => {
    const swatch = document.createElement('div');
    swatch.className = `color-option ${idx === 0 ? 'active' : ''}`;
    swatch.style.backgroundColor = color.hex;
    swatch.title = color.name;
    swatch.onclick = () => {
      document.querySelectorAll('#modal-color-options .color-option').forEach(el => el.classList.remove('active'));
      swatch.classList.add('active');
      selectedColor = color;
      document.getElementById('modal-selected-color-name').textContent = color.name;
    };
    colorContainer.appendChild(swatch);
  });
  document.getElementById('modal-selected-color-name').textContent = selectedColor.name;

  // Update current wallet balance in modal
  const modalWallet = document.getElementById('modal-wallet-balance');
  if (modalWallet) {
    modalWallet.textContent = formatCurrency(getWalletBalance());
  }

  // Setup payment method selection
  setupPaymentMethodCards();

  // Show Bootstrap Modal
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

function setupPaymentMethodCards() {
  const cardPocket = document.getElementById('pay-option-pocket');
  const cardCredit = document.getElementById('pay-option-card');
  if (!cardPocket || !cardCredit) return;

  cardPocket.onclick = () => {
    selectedPaymentMethod = 'pocket-money';
    cardPocket.classList.add('selected');
    cardCredit.classList.remove('selected');
  };

  cardCredit.onclick = () => {
    selectedPaymentMethod = 'credit-card';
    cardCredit.classList.add('selected');
    cardPocket.classList.remove('selected');
  };
}

// Proceed to payment page with stored order
function proceedToPayment() {
  if (!selectedOrderCar || !selectedColor) {
    showToast("Please select a car and color first!", "danger");
    return;
  }

  const orderData = {
    carId: selectedOrderCar.id,
    carName: selectedOrderCar.name,
    carBrand: selectedOrderCar.brand,
    price: selectedOrderCar.price,
    image: selectedOrderCar.image,
    color: selectedColor,
    paymentMethod: selectedPaymentMethod,
    orderDate: new Date().toISOString(),
    orderId: 'APX-' + Math.floor(100000 + Math.random() * 900000)
  };

  sessionStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(orderData));
  window.location.href = 'payment.html';
}

// Standard Car Card HTML Generator
function createCarCardHTML(car) {
  return `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="car-card">
        <div class="car-card-img-wrapper">
          <span class="car-brand-badge">${car.brand}</span>
          <span class="car-tag-badge"><i class="fas fa-certificate me-1"></i>${car.badge}</span>
          <img src="${car.image}" alt="${car.name}" class="car-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80'">
        </div>
        <div class="car-card-body">
          <h3 class="car-name" title="${car.name}">${car.name}</h3>
          <p class="car-desc">${car.description}</p>
          
          <div class="car-specs-grid">
            <div class="spec-item">
              <span class="spec-label">Top Speed</span>
              <span class="spec-val">${car.topSpeed}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">0-100 km/h</span>
              <span class="spec-val">${car.acceleration}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Power</span>
              <span class="spec-val">${car.horsepower}</span>
            </div>
          </div>

          <div class="car-price-row">
            <div>
              <span class="car-price-label">Price from</span>
              <div class="car-price-val">${formatCurrency(car.price)}</div>
            </div>
            <div class="d-flex gap-2">
              <a href="order.html?id=${encodeURIComponent(car.id)}" class="btn btn-sm btn-apex-outline" title="Full Details">
                <i class="fas fa-eye"></i>
              </a>
              <button onclick="openOrderModal('${car.id}')" class="btn btn-sm btn-apex-gold">
                <i class="fas fa-shopping-cart"></i> Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Modal HTML Template to inject into pages
function injectOrderModalHTML() {
  if (document.getElementById('apexOrderModal')) return;

  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = `
    <div class="modal fade" id="apexOrderModal" tabindex="-1" aria-labelledby="apexOrderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content modal-apex-content">
          <div class="modal-header modal-apex-header d-flex justify-content-between align-items-center">
            <div>
              <span class="badge bg-warning text-dark mb-1" id="modal-car-brand">Brand</span>
              <h4 class="modal-title font-heading mb-0" id="modal-car-name">Supercar Name</h4>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="position-relative rounded-3 overflow-hidden mb-3 border border-secondary">
                  <img id="modal-car-img" src="" alt="Car Preview" class="w-100" style="height: 220px; object-fit: cover;">
                </div>
                <div class="d-flex justify-content-between p-2 rounded bg-dark border border-secondary text-center">
                  <div>
                    <small class="text-muted d-block">Top Speed</small>
                    <strong id="modal-car-speed" class="text-white">--</strong>
                  </div>
                  <div>
                    <small class="text-muted d-block">0-100</small>
                    <strong id="modal-car-accel" class="text-white">--</strong>
                  </div>
                  <div>
                    <small class="text-muted d-block">Horsepower</small>
                    <strong id="modal-car-hp" class="text-white">--</strong>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <!-- Color Selector -->
                <div class="mb-4">
                  <label class="form-label fw-bold d-flex justify-content-between align-items-center">
                    <span><i class="fas fa-palette text-warning me-2"></i>Choose Exterior Color</span>
                    <small id="modal-selected-color-name" class="text-warning">Select Color</small>
                  </label>
                  <div class="d-flex gap-3 mt-2" id="modal-color-options">
                    <!-- Dynamic Swatches -->
                  </div>
                </div>

                <!-- Payment Method Selection -->
                <div class="mb-3">
                  <label class="form-label fw-bold mb-2">
                    <i class="fas fa-credit-card text-warning me-2"></i>Select Payment Method
                  </label>
                  <div class="d-flex flex-column gap-2">
                    <div class="pay-method-card selected d-flex align-items-center gap-3" id="pay-option-pocket">
                      <div class="fs-4 text-warning"><i class="fas fa-wallet"></i></div>
                      <div class="flex-grow-1">
                        <div class="fw-bold text-white">App Pocket Money (Fake Money)</div>
                        <small class="text-muted">Balance: <span id="modal-wallet-balance" class="text-success">$999,999,999,999,999</span></small>
                      </div>
                      <div><i class="fas fa-check-circle text-warning fs-5"></i></div>
                    </div>
                    <div class="pay-method-card d-flex align-items-center gap-3" id="pay-option-card">
                      <div class="fs-4 text-primary"><i class="fas fa-credit-card"></i></div>
                      <div class="flex-grow-1">
                        <div class="fw-bold text-white">Credit / Debit Card</div>
                        <small class="text-muted">Visa, Mastercard, Amex</small>
                      </div>
                      <div><i class="far fa-circle text-secondary fs-5"></i></div>
                    </div>
                  </div>
                </div>

                <!-- Price and CTA -->
                <div class="mt-4 pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
                  <div>
                    <small class="text-muted d-block">Total Purchase</small>
                    <span class="fs-4 fw-bold font-heading text-warning" id="modal-car-price">$0</span>
                  </div>
                  <button type="button" class="btn btn-apex-gold px-4 py-2" onclick="proceedToPayment()">
                    <i class="fas fa-lock me-2"></i>Pay Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalDiv);
}

// Global DOM Ready Init
document.addEventListener('DOMContentLoaded', () => {
  injectOrderModalHTML();
  updateNavbarWalletDisplay();
});
