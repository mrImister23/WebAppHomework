// Reviews & Feedback Logic (Assignment item 1: ความคิดเห็น)

const REVIEWS_STORAGE_KEY = 'APEX_CUSTOMER_REVIEWS';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Sir Alex Montgomery",
    car: "Ferrari SF90 Stradale",
    rating: 5,
    date: "2 days ago",
    comment: "The delivery via Apex Hypermotors concierge was impeccable. The SF90 acceleration is borderline surreal. Ordering process through App Pocket Money was instantaneous!",
    verified: true
  },
  {
    id: 2,
    name: "Elena Rostova",
    car: "Mercedes-AMG ONE Hypercar",
    rating: 5,
    date: "1 week ago",
    comment: "F1 engine noise at 11,000 RPM sends chills down your spine. The carbon finish and aerodynamic active wings are beyond artwork.",
    verified: true
  },
  {
    id: 3,
    name: "Kenji Sato",
    car: "Nissan GT-R NISMO Special Edition",
    rating: 5,
    date: "2 weeks ago",
    comment: "Godzilla in its finest iteration. Cornering grip defies physics. Outstanding service and communication from the team.",
    verified: true
  },
  {
    id: 4,
    name: "Marcus Vance",
    car: "BYD Yangwang U9",
    rating: 5,
    date: "3 weeks ago",
    comment: "The DiSus-X suspension system is like nothing else on this planet. It literally dances on the track and launches harder than anything I've ever owned.",
    verified: true
  }
];

let selectedRating = 5;

document.addEventListener('DOMContentLoaded', () => {
  renderReviews();
  setupStarPicker();
  setupReviewForm();
  populateCarDropdown();
});

function getStoredReviews() {
  const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_REVIEWS;
  }
}

function renderReviews() {
  const listEl = document.getElementById('reviews-list');
  if (!listEl) return;

  const reviews = getStoredReviews();
  
  // Calculate average rating
  const avg = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const avgEl = document.getElementById('reviews-avg-rating');
  if (avgEl) avgEl.textContent = avg;
  
  const countEl = document.getElementById('reviews-total-count');
  if (countEl) countEl.textContent = reviews.length;

  listEl.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h5 class="mb-0 text-white fw-bold">${escapeHTML(r.name)}</h5>
          <small class="text-warning"><i class="fas fa-car-side me-1"></i>${escapeHTML(r.car)}</small>
        </div>
        <div class="text-end">
          <div class="text-warning mb-1">
            ${'<i class="fas fa-star"></i>'.repeat(r.rating)}
            ${'<i class="far fa-star"></i>'.repeat(5 - r.rating)}
          </div>
          <small class="text-muted">${r.date}</small>
        </div>
      </div>
      <p class="text-light mb-2" style="font-size: 0.95rem; line-height: 1.6;">${escapeHTML(r.comment)}</p>
      ${r.verified ? '<span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50"><i class="fas fa-check-circle me-1"></i>Verified Supercar Owner</span>' : ''}
    </div>
  `).join('');
}

function setupStarPicker() {
  const stars = document.querySelectorAll('#star-picker i');
  stars.forEach((star, index) => {
    star.onclick = () => {
      selectedRating = index + 1;
      updateStarsVisual(selectedRating);
    };
    star.onmouseenter = () => {
      updateStarsVisual(index + 1);
    };
  });

  const pickerContainer = document.getElementById('star-picker');
  if (pickerContainer) {
    pickerContainer.onmouseleave = () => {
      updateStarsVisual(selectedRating);
    };
  }
}

function updateStarsVisual(rating) {
  const stars = document.querySelectorAll('#star-picker i');
  stars.forEach((s, idx) => {
    if (idx < rating) {
      s.classList.remove('far');
      s.classList.add('fas', 'active');
    } else {
      s.classList.remove('fas', 'active');
      s.classList.add('far');
    }
  });
}

function populateCarDropdown() {
  const select = document.getElementById('review-car-select');
  if (!select) return;

  const cars = getAllCars();
  select.innerHTML = '<option value="">Select your Supercar</option>';
  cars.forEach(car => {
    const opt = document.createElement('option');
    opt.value = car.name;
    opt.textContent = `${car.brand} - ${car.name}`;
    select.appendChild(opt);
  });
}

function setupReviewForm() {
  const form = document.getElementById('review-submission-form');
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('review-author-name').value.trim();
    const car = document.getElementById('review-car-select').value || 'Apex Supercar';
    const comment = document.getElementById('review-text').value.trim();

    if (!name || !comment) {
      showToast("Please fill in your name and feedback comment.", "danger");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name,
      car: car,
      rating: selectedRating,
      date: "Just now",
      comment: comment,
      verified: true
    };

    const reviews = getStoredReviews();
    reviews.unshift(newReview);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));

    form.reset();
    selectedRating = 5;
    updateStarsVisual(5);
    renderReviews();

    showToast("Thank you! Your feedback has been published.", "success");
  };
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
