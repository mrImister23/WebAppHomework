// Store Page Logic: Filtering & Sorting
// Default sort: Highest to lowest price as requested

let currentBrandFilter = 'All';
let currentSortOrder = 'price-high-to-low'; // default highest to lowest
let currentMaxPrice = 5000000;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  // Read URL query parameters (e.g. ?brand=Ferraries)
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get('brand');
  if (brandParam) {
    currentBrandFilter = brandParam;
  }

  setupBrandFilters();
  setupEventListeners();
  applyFiltersAndRender();
});

// Setup Brand Filter Pills and Select Dropdown
function setupBrandFilters() {
  const brands = ['All', ...getAllBrands()];
  const pillContainer = document.getElementById('store-brand-pills');
  const selectEl = document.getElementById('store-brand-select');

  if (pillContainer) {
    pillContainer.innerHTML = '';
    brands.forEach(b => {
      const btn = document.createElement('button');
      btn.className = `brand-pill-btn ${b === currentBrandFilter ? 'active' : ''}`;
      btn.textContent = b;
      btn.onclick = () => {
        currentBrandFilter = b;
        document.querySelectorAll('.brand-pill-btn').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        if (selectEl) selectEl.value = b;
        applyFiltersAndRender();
      };
      pillContainer.appendChild(btn);
    });
  }

  if (selectEl) {
    selectEl.innerHTML = '';
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      opt.selected = (b === currentBrandFilter);
      selectEl.appendChild(opt);
    });

    selectEl.onchange = (e) => {
      currentBrandFilter = e.target.value;
      document.querySelectorAll('.brand-pill-btn').forEach(el => {
        el.classList.toggle('active', el.textContent === currentBrandFilter);
      });
      applyFiltersAndRender();
    };
  }
}

// Setup Event Listeners for search, sort and price slider
function setupEventListeners() {
  const sortSelect = document.getElementById('store-sort-select');
  if (sortSelect) {
    sortSelect.value = currentSortOrder;
    sortSelect.onchange = (e) => {
      currentSortOrder = e.target.value;
      applyFiltersAndRender();
    };
  }

  const priceSlider = document.getElementById('store-price-range');
  const priceDisplay = document.getElementById('store-price-display');
  if (priceSlider && priceDisplay) {
    currentMaxPrice = Number(priceSlider.value);
    priceDisplay.textContent = formatCurrency(currentMaxPrice);

    priceSlider.oninput = (e) => {
      currentMaxPrice = Number(e.target.value);
      priceDisplay.textContent = formatCurrency(currentMaxPrice);
      applyFiltersAndRender();
    };
  }

  const searchInput = document.getElementById('store-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFiltersAndRender();
    };
  }

  const resetBtn = document.getElementById('store-reset-filters');
  if (resetBtn) {
    resetBtn.onclick = () => {
      currentBrandFilter = 'All';
      currentSortOrder = 'price-high-to-low';
      currentMaxPrice = 5000000;
      searchQuery = '';

      if (priceSlider) priceSlider.value = 5000000;
      if (priceDisplay) priceDisplay.textContent = formatCurrency(5000000);
      if (sortSelect) sortSelect.value = 'price-high-to-low';
      if (searchInput) searchInput.value = '';

      document.querySelectorAll('.brand-pill-btn').forEach(el => {
        el.classList.toggle('active', el.textContent === 'All');
      });
      const selectEl = document.getElementById('store-brand-select');
      if (selectEl) selectEl.value = 'All';

      applyFiltersAndRender();
      showToast("Filters reset to default!", "info");
    };
  }
}

// Filter and Sort dataset, then render cards
function applyFiltersAndRender() {
  let cars = getAllCars();

  // 1. Filter by Brand
  if (currentBrandFilter !== 'All') {
    cars = cars.filter(c => c.brand.toLowerCase() === currentBrandFilter.toLowerCase());
  }

  // 2. Filter by Price Range
  cars = cars.filter(c => c.price <= currentMaxPrice);

  // 3. Filter by Search Query
  if (searchQuery) {
    cars = cars.filter(c => 
      c.name.toLowerCase().includes(searchQuery) ||
      c.brand.toLowerCase().includes(searchQuery) ||
      c.description.toLowerCase().includes(searchQuery)
    );
  }

  // 4. Sort logic (Default: Highest to Lowest)
  if (currentSortOrder === 'price-high-to-low') {
    cars.sort((a, b) => b.price - a.price);
  } else if (currentSortOrder === 'price-low-to-high') {
    cars.sort((a, b) => a.price - b.price);
  } else if (currentSortOrder === 'name-asc') {
    cars.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSortOrder === 'power-desc') {
    cars.sort((a, b) => parseInt(b.horsepower) - parseInt(a.horsepower));
  }

  // Render Result Counter
  const countEl = document.getElementById('store-result-count');
  if (countEl) {
    countEl.textContent = `Showing ${cars.length} of ${getAllCars().length} Supercars`;
  }

  // Render Grid
  const grid = document.getElementById('store-cars-grid');
  if (!grid) return;

  if (cars.length === 0) {
    grid.innerHTML = `
      <div class="col-12 py-5 text-center">
        <div class="py-5">
          <i class="fas fa-car-crash fa-4x text-muted mb-3"></i>
          <h4 class="text-white">No supercars found</h4>
          <p class="text-muted">Try adjusting your brand filter or raising the price range limit.</p>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = cars.map(car => createCarCardHTML(car)).join('');
}
