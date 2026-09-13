// Order Page Logic: Individual Car Showcase, Specs & Modal Trigger

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id') || 'ferrari-sf90';
  const car = getCarById(carId);

  if (!car) {
    window.location.href = 'store.html';
    return;
  }

  renderCarDetails(car);
  renderRelatedCars(car);
});

function renderCarDetails(car) {
  // Title & Badges
  document.getElementById('order-car-name').textContent = car.name;
  document.getElementById('order-car-brand').textContent = car.brand;
  document.getElementById('order-car-badge').innerHTML = `<i class="fas fa-crown me-1"></i>${car.badge}`;
  document.getElementById('order-car-desc').textContent = car.description;
  document.getElementById('order-car-price').textContent = formatCurrency(car.price);
  
  // Images
  const mainImg = document.getElementById('order-main-img');
  mainImg.src = car.image;
  mainImg.alt = car.name;

  // Specs
  document.getElementById('spec-top-speed').textContent = car.topSpeed;
  document.getElementById('spec-accel').textContent = car.acceleration;
  document.getElementById('spec-hp').textContent = car.horsepower;
  document.getElementById('spec-engine').textContent = car.engine || 'High Performance Hybrid V8';
  document.getElementById('spec-transmission').textContent = car.transmission || 'Dual-Clutch Paddle Shift';

  // Exterior Color Swatches preview
  const colorContainer = document.getElementById('order-color-swatches');
  const colorLabel = document.getElementById('order-selected-color-label');
  if (colorContainer) {
    colorContainer.innerHTML = '';
    car.colors.forEach((color, idx) => {
      const swatch = document.createElement('div');
      swatch.className = `color-option ${idx === 0 ? 'active' : ''}`;
      swatch.style.backgroundColor = color.hex;
      swatch.title = color.name;
      swatch.onclick = () => {
        document.querySelectorAll('#order-color-swatches .color-option').forEach(el => el.classList.remove('active'));
        swatch.classList.add('active');
        if (colorLabel) colorLabel.textContent = color.name;
      };
      colorContainer.appendChild(swatch);
    });
    if (colorLabel) colorLabel.textContent = car.colors[0].name;
  }

  // Connect Order Trigger Button
  const orderBtn = document.getElementById('order-trigger-modal-btn');
  if (orderBtn) {
    orderBtn.onclick = () => {
      openOrderModal(car.id);
    };
  }
}

function renderRelatedCars(currentCar) {
  const container = document.getElementById('related-cars-grid');
  if (!container) return;

  const all = getAllCars();
  // Filter other cars from same brand or similar price
  const related = all.filter(c => c.id !== currentCar.id).slice(0, 3);
  container.innerHTML = related.map(car => createCarCardHTML(car)).join('');
}
