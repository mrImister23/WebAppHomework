// Payment Page Logic: Mock Fake Money System & Card Authorization

let currentOrder = null;

document.addEventListener('DOMContentLoaded', () => {
  loadOrderData();
  setupPaymentMethods();
  setupCardInputs();
  updateWalletUI();
});

// Load pending order from sessionStorage or create default
function loadOrderData() {
  const raw = sessionStorage.getItem(CURRENT_ORDER_KEY);
  if (raw) {
    try {
      currentOrder = JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
  }

  if (!currentOrder) {
    const defaultCar = getCarById('ferrari-sf90');
    currentOrder = {
      carId: defaultCar.id,
      carName: defaultCar.name,
      carBrand: defaultCar.brand,
      price: defaultCar.price,
      image: defaultCar.image,
      color: defaultCar.colors[0],
      paymentMethod: 'pocket-money',
      orderDate: new Date().toISOString(),
      orderId: 'APX-' + Math.floor(100000 + Math.random() * 900000)
    };
  }

  // Render Order Summary
  document.getElementById('summary-car-name').textContent = currentOrder.carName;
  document.getElementById('summary-car-brand').textContent = currentOrder.carBrand;
  document.getElementById('summary-car-img').src = currentOrder.image;
  document.getElementById('summary-order-id').textContent = currentOrder.orderId;
  
  // Color
  const colorDot = document.getElementById('summary-color-dot');
  if (colorDot && currentOrder.color) {
    colorDot.style.backgroundColor = currentOrder.color.hex;
    document.getElementById('summary-color-name').textContent = currentOrder.color.name;
  }

  // Price calculations
  const price = currentOrder.price;
  document.getElementById('summary-base-price').textContent = formatCurrency(price);
  document.getElementById('summary-tax').textContent = '$0 (Tax Included Promo)';
  document.getElementById('summary-total-price').textContent = formatCurrency(price);
  
  const payBtnLabel = document.getElementById('pocket-pay-btn-amount');
  if (payBtnLabel) payBtnLabel.textContent = formatCurrency(price);
  
  const cardBtnLabel = document.getElementById('card-pay-btn-amount');
  if (cardBtnLabel) cardBtnLabel.textContent = formatCurrency(price);

  // Set default active tab
  if (currentOrder.paymentMethod === 'credit-card') {
    const cardTabTrigger = document.querySelector('#pills-card-tab');
    if (cardTabTrigger) cardTabTrigger.click();
  }
}

// Update Fake Wallet UI
function updateWalletUI() {
  const balance = getWalletBalance();
  const balanceEl = document.getElementById('payment-pocket-balance');
  if (balanceEl) {
    balanceEl.textContent = formatCurrency(balance);
  }

  const remainingAfterEl = document.getElementById('payment-pocket-after');
  if (remainingAfterEl && currentOrder) {
    const after = balance - currentOrder.price;
    remainingAfterEl.textContent = formatCurrency(Math.max(0, after));
  }
}

// Setup Payment Method Switcher
function setupPaymentMethods() {
  const pocketPayBtn = document.getElementById('btn-pay-pocket');
  if (pocketPayBtn) {
    pocketPayBtn.onclick = handlePocketMoneyPayment;
  }

  const cardPayBtn = document.getElementById('btn-pay-card');
  if (cardPayBtn) {
    cardPayBtn.onclick = handleCreditCardPayment;
  }

  const resetBtn = document.getElementById('btn-reset-wallet-payment');
  if (resetBtn) {
    resetBtn.onclick = () => {
      resetWalletBalance();
      updateWalletUI();
    };
  }
}

// Process Fake App Pocket Money
function handlePocketMoneyPayment() {
  const balance = getWalletBalance();
  if (balance < currentOrder.price) {
    showToast("Insufficient fake pocket money! Click 'Reset Balance' to top back up to $999,999,999,999,999.", "danger");
    return;
  }

  showProcessing(() => {
    const newBalance = balance - currentOrder.price;
    updateWalletBalance(newBalance);
    updateWalletUI();
    renderSuccessReceipt("App Pocket Money (Fake Money Balance)");
  });
}

// Process Credit Card Payment
function handleCreditCardPayment() {
  const cardNum = document.getElementById('input-card-number').value.replace(/\s+/g, '');
  const cardHolder = document.getElementById('input-card-name').value.trim();
  const cardExpiry = document.getElementById('input-card-expiry').value.trim();
  const cardCvv = document.getElementById('input-card-cvv').value.trim();

  if (cardNum.length < 15 || !cardHolder || !cardExpiry || cardCvv.length < 3) {
    showToast("Please fill in valid simulated credit card details.", "danger");
    return;
  }

  showProcessing(() => {
    const masked = '•••• •••• •••• ' + cardNum.slice(-4);
    renderSuccessReceipt(`Credit Card (${masked})`);
  });
}

// Simulated network loading indicator
function showProcessing(callback) {
  const modalEl = document.getElementById('processingModal');
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();

  setTimeout(() => {
    bsModal.hide();
    callback();
  }, 1600);
}

// Render Finished Receipt View
function renderSuccessReceipt(methodName) {
  document.getElementById('checkout-steps-container').classList.add('d-none');
  const receiptContainer = document.getElementById('receipt-container');
  receiptContainer.classList.remove('d-none');

  document.getElementById('receipt-order-id').textContent = currentOrder.orderId;
  document.getElementById('receipt-date').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  document.getElementById('receipt-car-name').textContent = currentOrder.carName;
  document.getElementById('receipt-brand').textContent = currentOrder.carBrand;
  document.getElementById('receipt-color').textContent = currentOrder.color.name;
  document.getElementById('receipt-method').textContent = methodName;
  document.getElementById('receipt-amount').textContent = formatCurrency(currentOrder.price);

  showToast("Order Confirmed! Your supercar allocation has been secured.", "success");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Live credit card formatting
function setupCardInputs() {
  const cardInput = document.getElementById('input-card-number');
  const previewNum = document.getElementById('card-preview-number');
  const nameInput = document.getElementById('input-card-name');
  const previewName = document.getElementById('card-preview-name');
  const expiryInput = document.getElementById('input-card-expiry');
  const previewExpiry = document.getElementById('card-preview-expiry');

  if (cardInput && previewNum) {
    cardInput.oninput = (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
      previewNum.textContent = val || '•••• •••• •••• ••••';
    };
  }

  if (nameInput && previewName) {
    nameInput.oninput = (e) => {
      previewName.textContent = e.target.value.toUpperCase() || 'VALUED CLIENT';
    };
  }

  if (expiryInput && previewExpiry) {
    expiryInput.oninput = (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      previewExpiry.textContent = val || 'MM/YY';
    };
  }
}
