# 🏎️ Apex Hypermotors - Luxury Supercar Online Shop
> **Course:** Web Application Development  
> **Assignment Submission:** Assignment-MyJS-BT-Webpage  
> **Tech Stack:** HTML5, CSS3, Bootstrap 5, Vanilla JavaScript  

---

## 📌 Project Overview
Apex Hypermotors is a state-of-the-art luxury supercar online store built with a dark carbon-fiber / gold aesthetic. It features an integrated simulated fake money wallet (**$999,999,999,999,999**), real-time filtering across 14 prestigious marques, an interactive vehicle order atelier with live color customizer, and full checkout with receipt generation.

---

## 🌟 Assignment Requirements Breakdown

1. **All Required Pages (ครบทุกเมนูตามที่กำหนด)**:
   - **`index.html` (หน้าแรก - Home)**: Billboard promotions hero with **Bootstrap 5 Carousel**, brand strip, popular supercars section upon scrolling down, performance progress bars, and FAQ accordion.
   - **`store.html` (สินค้า - Store)**: Catalog **sorted by price from highest to lowest by default** ($3,850,000 Ferrari SF90 first), with brand filtering across all 14 brands, interactive price slider, and live search.
   - **`promotions.html` (โปรโมชัน - Promotions)**: Billboard campaigns, F1 track packages, and copyable VIP promo codes.
   - **`order.html` (สั่งซื้อ - Order)**: Vehicle specifications and technical specs. Clicking "Click to Order" opens a **pop-up modal window** to select exterior coachwork colors and choose payment method (Credit Card or App Pocket Money).
   - **`payment.html` (การชำระเงิน - Payment)**: Mock gateway with pre-loaded **$999,999,999,999,999** fake money balance. Real-time balance deduction, Credit Card simulation, and printable confirmed receipt.
   - **`contact.html` (ติดต่อเรา - Contact Us)**: Showroom lounges in Bangkok, Monaco, and Dubai, with private VIP test-drive booking form.
   - **`reviews.html` (ความคิดเห็น - Reviews)**: Verified collector testimonials with interactive 1-5 star rating selector and real-time review publishing stored in `localStorage`.

2. **Interconnected Architecture (เชื่อมการทำงานทุกๆ หน้า)**:
   - Consistent responsive navbar with dynamic wallet balance pill that updates across all pages.
   - Cross-page state management via `sessionStorage` (passing ordered car model, price, and color to the payment gateway) and `localStorage` (wallet balance and reviews).

3. **Beautified with CSS, Bootstrap 5, and JavaScript (ตกแต่งด้วย CSS, Bootstrap, JavaScript)**:
   - Rich dark carbon-fiber theme with gold (`#e5b94c`) and crimson (`#ff334b`) racing accents.
   - **Bootstrap 5 Components**:
     - Dismissible Alert banner (`.alert .alert-warning .alert-dismissible`)
     - Carousel with indicators and controls (`.carousel .slide .carousel-fade`)
     - Animated Striped Progress Bars (`.progress`, `.progress-bar-striped`, `.progress-bar-animated`)
     - Collapsible Accordion (`.accordion .accordion-flush`)
     - Modal Dialog (`.modal`, `.modal-dialog-centered`)
     - Responsive Grid system (`.container`, `.row`, `.col-*`)

4. **All 14 Required Car Brands Included**:
   - BMW, Ferraries, Mercedes benz, Toyota, Nissan, Ford, Honda, Tesla, BYD, Subaru, Suzuki, Mazda, Izusu, and Audi.

5. **Submission Package**:
   - `Assignment-MyJS-BT-Webpage.zip` included directly in the root directory.

---

## 📁 Repository Structure

```
├── index.html                   # Home page (Billboard carousel hero + Popular on scroll)
├── store.html                   # Store page (Price sort highest-to-lowest, 14 brands filter)
├── promotions.html              # Promotions page (Billboard deals, VIP perks)
├── order.html                   # Order page (Specs showcase & order pop-up window)
├── payment.html                 # Payment page ($999,999,999,999,999 fake money wallet & receipt)
├── contact.html                 # Contact Us page (Showroom locations & appointment form)
├── reviews.html                 # Reviews page (Star rating system & feedback publishing)
├── javascript.js                # Core overview script
├── Assignment-MyJS-BT-Webpage.zip # Submission zip archive
├── css/
│   └── style.css                # Custom luxury dark theme & glassmorphic design system
└── js/
    ├── cars-data.js             # 14 Brands database with realistic specs and high-res images
    ├── main.js                  # Shared wallet state, order popup modal & toast notifications
    ├── store.js                 # Sorting, brand filtering, price range slider & search
    ├── order.js                 # Individual supercar atelier controller
    ├── payment.js               # Balance deduction & simulated invoice generator
    └── reviews.js               # 5-star rating and comment submission controller
```

---

## 🚀 Running Locally

Clone the repository and open `index.html` in any modern web browser, or run a local web server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Navigate to `http://localhost:8080` in your browser.