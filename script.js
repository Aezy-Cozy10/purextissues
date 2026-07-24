/* =====================================================================
   PUREX TISSUES — SCRIPT.JS
   -----------------------------------------------------------------
   CONTENTS
   0.  Data (categories, products, offers, gallery images, FAQ)
   1.  Loading screen
   2.  Scroll progress bar + sticky navbar shadow + smooth scroll + back-to-top
   3.  Responsive nav menu
   4.  Live clock (Pakistan Standard Time)
   5.  Dark / light mode toggle
   6.  Click sound (Web Audio, no external file needed)
   7.  Render: categories, offers, products, gallery, FAQ
   8.  Product filters + search
   9.  Wishlist + quantity selectors
   10. Cart (add/remove/update, localStorage, drawer)
   11. Quick View modal
   12. Lightbox gallery viewer
   13. Testimonials slider
   14. FAQ accordion
   15. Newsletter + contact form validation
   16. Track order simulation
   17. Checkout flow (steps, Pakistan map picker, payment, order id)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ================= 0. DATA ================= */
  const CATEGORIES = [
    { id:'boxes',     name:'Tissue Boxes',        icon:'🧻', img:'https://loremflickr.com/500/400/tissuebox?lock=1' },
    { id:'toilet',    name:'Toilet Rolls',        icon:'🧻', img:'https://loremflickr.com/500/400/toiletpaper?lock=2' },
    { id:'kitchen',   name:'Kitchen Rolls',       icon:'🍽',  img:'https://loremflickr.com/500/400/papertowel?lock=3' },
    { id:'sanitizer', name:'Hand Sanitizers',     icon:'🧴', img:'https://loremflickr.com/500/400/handsanitizer?lock=4' },
    { id:'cleaning',  name:'Cleaning Products',   icon:'🧽', img:'https://loremflickr.com/500/400/cleaningsupplies?lock=5' },
    { id:'soap',      name:'Liquid Soap',         icon:'🧼', img:'https://loremflickr.com/500/400/liquidsoap?lock=6' },
    { id:'accessory', name:'Cleaning Accessories',icon:'🧹', img:'https://loremflickr.com/500/400/cleaningbrush?lock=7' },
  ];

  const PRODUCTS = [
    { id:1,  cat:'boxes',     name:'Purex Silk Facial Tissue Box',      desc:'3-ply ultra-soft facial tissues, 150 pulls.',         price:250, old:300, img:'https://loremflickr.com/500/400/facialtissue?lock=11', stock:'in' },
    { id:2,  cat:'boxes',     name:'Purex Classic Tissue Box (Twin Pack)', desc:'2-ply everyday tissue box, pack of 2.',              price:180, old:0,   img:'https://loremflickr.com/500/400/tissuebox?lock=12', stock:'in' },
    { id:3,  cat:'boxes',     name:'Purex Cube Tissue Box',              desc:'Compact cube box, ideal for cars & desks.',            price:150, old:0,   img:'https://loremflickr.com/500/400/tissuecube?lock=13', stock:'low' },
    { id:4,  cat:'toilet',    name:'Purex Soft Toilet Rolls (Pack of 10)', desc:'3-ply embossed toilet tissue, long-lasting rolls.',   price:820, old:950, img:'https://loremflickr.com/500/400/toiletpaperroll?lock=14', stock:'in' },
    { id:5,  cat:'toilet',    name:'Purex Value Toilet Rolls (Pack of 4)', desc:'2-ply everyday toilet rolls for the home.',           price:340, old:0,   img:'https://loremflickr.com/500/400/toiletroll?lock=15', stock:'in' },
    { id:6,  cat:'kitchen',   name:'Purex Kitchen Towel Rolls (Pack of 3)', desc:'Extra-absorbent kitchen rolls for spills & prep.',    price:410, old:460, img:'https://loremflickr.com/500/400/kitchenroll?lock=16', stock:'in' },
    { id:7,  cat:'kitchen',   name:'Purex Jumbo Kitchen Roll',           desc:'Single jumbo roll, 2x the length of standard rolls.',  price:220, old:0,   img:'https://loremflickr.com/500/400/papertowelroll?lock=17', stock:'out' },
    { id:8,  cat:'sanitizer', name:'Purex Hand Sanitizer 500ml',        desc:'70% alcohol-based gel, kills 99.9% of germs.',         price:390, old:450, img:'https://loremflickr.com/500/400/handsanitizerbottle?lock=18', stock:'in' },
    { id:9,  cat:'sanitizer', name:'Purex Pocket Sanitizer 60ml (3-pack)', desc:'Travel-size sanitizer bottles for bags & pockets.',   price:270, old:0,   img:'https://loremflickr.com/500/400/travelsanitizer?lock=19', stock:'in' },
    { id:10, cat:'cleaning',  name:'Purex Multi-Surface Cleaner Spray', desc:'Streak-free spray for kitchens, glass & counters.',    price:480, old:0,   img:'https://loremflickr.com/500/400/surfacecleaner?lock=20', stock:'in' },
    { id:11, cat:'cleaning',  name:'Purex Disinfectant Spray 400ml',    desc:'Kills bacteria & viruses on hard surfaces.',           price:520, old:600, img:'https://loremflickr.com/500/400/disinfectantspray?lock=21', stock:'low' },
    { id:12, cat:'cleaning',  name:'Purex Cleaning Wipes (Pack of 80)', desc:'Pre-moistened wipes for quick everyday cleanups.',     price:360, old:0,   img:'https://loremflickr.com/500/400/cleaningwipes?lock=22', stock:'in' },
    { id:13, cat:'soap',      name:'Purex Liquid Hand Soap 500ml',      desc:'Moisturising hand wash with a light fragrance.',       price:310, old:0,   img:'https://loremflickr.com/500/400/liquidsoapbottle?lock=23', stock:'in' },
    { id:14, cat:'soap',      name:'Purex Dish Wash Liquid 750ml',      desc:'Grease-cutting formula, gentle on hands.',             price:340, old:390, img:'https://loremflickr.com/500/400/dishsoap?lock=24', stock:'in' },
    { id:15, cat:'accessory', name:'Purex Microfiber Cleaning Cloths (6-pack)', desc:'Lint-free cloths for glass, screens & dusting.', price:450, old:0, img:'https://loremflickr.com/500/400/microfibercloth?lock=25', stock:'in' },
    { id:16, cat:'accessory', name:'Purex Cleaning Brush Set',          desc:'3-piece brush set for tough scrubbing jobs.',          price:520, old:0,   img:'https://loremflickr.com/500/400/scrubbrush?lock=26', stock:'low' },
    { id:17, cat:'boxes',     name:'Purex Aloe Vera Tissue Box',        desc:'Aloe vera infused tissues for sensitive skin.',        price:280, old:320, img:'https://loremflickr.com/500/400/aloetissue?lock=27', stock:'in' },
    { id:18, cat:'kitchen',   name:'Purex Corporate Kitchen Roll Carton (Pack of 24)', desc:'Bulk carton for offices & restaurants.', price:3200, old:3600, img:'https://loremflickr.com/500/400/papertowelcarton?lock=28', stock:'in' },
  ];

  const OFFERS = [
    { badge:'-20%', title:'Family Bundle', desc:'2x Tissue Boxes + 4x Toilet Rolls at a bundled discount.', cat:'boxes' },
    { badge:'-15%', title:'Office Cleaning Kit', desc:'Sanitizer + surface cleaner + wipes, bundled for workplaces.', cat:'cleaning' },
    { badge:'BULK', title:'Wholesale Kitchen Rolls', desc:'Carton orders of 24+ kitchen rolls at wholesale pricing.', cat:'kitchen' },
  ];

  const GALLERY = [
    { img:'https://loremflickr.com/500/650/tissuebox,premium?lock=41', label:'Premium Tissue Boxes' },
    { img:'https://loremflickr.com/500/380/toiletpaper,stack?lock=42', label:'Toilet Rolls' },
    { img:'https://loremflickr.com/500/500/papertowel,roll?lock=43',   label:'Kitchen Rolls' },
    { img:'https://loremflickr.com/500/620/handsanitizer,bottle?lock=44', label:'Hand Sanitizers' },
    { img:'https://loremflickr.com/500/420/cleaning,chemical?lock=45', label:'Cleaning Chemicals' },
    { img:'https://loremflickr.com/500/560/warehouse,logistics?lock=46', label:'Warehouse' },
    { img:'https://loremflickr.com/500/400/deliveryvan?lock=47',       label:'Delivery Vans' },
    { img:'https://loremflickr.com/500/540/tissuebox,softness?lock=48', label:'Premium Tissue Boxes' },
  ];

  const FAQS = [
    { q:'What areas in Pakistan do you deliver to?', a:'We currently deliver to all major cities across Punjab, Sindh, KPK, Balochistan, Islamabad Capital Territory, Gilgit-Baltistan and Azad Kashmir. Delivery times vary by region.' },
    { q:'What payment methods are accepted?', a:'We accept Cash on Delivery, Bank Transfer, JazzCash, EasyPaisa, and Debit/Credit Cards at checkout.' },
    { q:'How long does delivery take?', a:'Major cities typically receive orders within 1–3 business days. Remote areas may take 3–5 business days.' },
    { q:'Do you offer bulk or wholesale pricing?', a:'Yes — offices, restaurants and retailers can contact us for corporate supply and wholesale pricing on bulk cartons.' },
    { q:'Can I return a product?', a:'Unused products in original packaging can be returned within 7 days of delivery. Contact our support team to arrange a pickup.' },
  ];

  const state = {
    cart: JSON.parse(localStorage.getItem('purexCart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('purexWishlist') || '[]'),
    activeFilter: 'all',
    searchTerm: '',
    qtyDraft: {},        // temp quantity selections per product before adding to cart
    checkoutLocation: null,
    currentGalleryIndex: 0,
  };

  /* ================= 1. LOADING SCREEN ================= */
  function initLoader(){
    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('loading-screen').classList.add('hide'), 700);
    });
    // Fallback in case 'load' already fired
    setTimeout(() => document.getElementById('loading-screen').classList.add('hide'), 2500);
  }

  /* ================= 2. SCROLL PROGRESS / NAVBAR / SMOOTH SCROLL / BACK TO TOP ================= */
  function initScrollUX(){
    const progress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const backBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
      navbar.classList.toggle('scrolled', scrollTop > 10);
      backBtn.classList.toggle('show', scrollTop > 500);
    });

    backBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

    // Smooth scroll for in-page anchors (native CSS scroll-behavior already covers most,
    // this also closes the mobile menu after navigating)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
      });
    });
  }

  /* ================= 3. RESPONSIVE NAV MENU ================= */
  function initNavMenu(){
    document.getElementById('menuToggle').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('open');
    });
  }

  /* ================= 4. LIVE CLOCK (Pakistan Standard Time, UTC+5) ================= */
  function initClock(){
    const el = document.getElementById('liveClock');
    function tick(){
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
      const h = String(now.getHours()).padStart(2,'0');
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      el.textContent = `${h}:${m}:${s} PKT`;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ================= 5. DARK / LIGHT MODE ================= */
  function initDarkMode(){
    const toggle = document.getElementById('darkModeToggle');
    const saved = localStorage.getItem('purexTheme');
    if (saved === 'dark') document.body.classList.add('dark');
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('purexTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
      playClick();
    });
  }

  /* ================= 6. CLICK SOUND (synthesised, no external audio file) ================= */
  let audioCtx;
  function playClick(){
    try{
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = 720;
      g.gain.setValueAtTime(0.06, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + 0.08);
    }catch(e){ /* audio unsupported — fail silently */ }
  }
  function initClickSounds(){
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn, .add-cart-btn, .filter-chip, .wishlist-btn, .qty-selector button, #cartToggle')) playClick();
    });
  }

  /* ================= 7. RENDER FUNCTIONS ================= */
  function renderCategories(){
    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = CATEGORIES.map(c => `
      <div class="category-card" data-cat="${c.id}">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="cat-label">
          <span class="icon">${c.icon}</span>
          <h4>${c.name}</h4>
          <span>${PRODUCTS.filter(p => p.cat === c.id).length} products</span>
        </div>
      </div>`).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        state.activeFilter = card.dataset.cat;
        syncFilterChips();
        renderProducts();
        document.getElementById('products').scrollIntoView({ behavior:'smooth' });
      });
    });

    // build filter chips from categories
    const filterBar = document.getElementById('productFilters');
    CATEGORIES.forEach(c => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip';
      chip.dataset.filter = c.id;
      chip.textContent = c.name;
      filterBar.appendChild(chip);
    });
    filterBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      state.activeFilter = chip.dataset.filter;
      syncFilterChips();
      renderProducts();
    });
  }

  function syncFilterChips(){
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === state.activeFilter));
  }

  function renderOffers(){
    document.getElementById('offersGrid').innerHTML = OFFERS.map(o => `
      <div class="offer-card">
        <span class="badge">${o.badge}</span>
        <h4>${o.title}</h4>
        <p>${o.desc}</p>
        <button class="btn btn-outline offer-shop" data-cat="${o.cat}" style="border-color:#fff;color:#fff;">Shop Category</button>
      </div>`).join('');

    document.getElementById('offersGrid').querySelectorAll('.offer-shop').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeFilter = btn.dataset.cat;
        syncFilterChips();
        renderProducts();
        document.getElementById('products').scrollIntoView({ behavior:'smooth' });
      });
    });
  }

  function stockLabel(stock){
    if (stock === 'in') return { text:'In Stock', cls:'in' };
    if (stock === 'low') return { text:'Low Stock', cls:'low' };
    return { text:'Out of Stock', cls:'out' };
  }

  function productCardHTML(p){
    const s = stockLabel(p.stock);
    const discount = p.old ? Math.round(100 - (p.price / p.old) * 100) : 0;
    const qty = state.qtyDraft[p.id] || 1;
    const wished = state.wishlist.includes(p.id);
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-media">
          ${discount ? `<span class="product-badge">-${discount}%</span>` : (p.stock !== 'in' ? `<span class="product-badge stock-${p.stock === 'low' ? 'low' : 'out'}">${s.text}</span>` : '')}
          <button class="wishlist-btn ${wished ? 'active' : ''}" data-action="wishlist" aria-label="Toggle wishlist"><i class="fa-solid fa-heart"></i></button>
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <button class="quick-view-btn" data-action="quickview">Quick View</button>
        </div>
        <div class="product-info">
          <span class="product-cat">${CATEGORIES.find(c=>c.id===p.cat).name}</span>
          <h4>${p.name}</h4>
          <p class="product-desc">${p.desc}</p>
          <div class="price-row">
            <span class="price-now">Rs. ${p.price.toLocaleString()}</span>
            ${p.old ? `<span class="price-old">Rs. ${p.old.toLocaleString()}</span>` : ''}
          </div>
          <span class="stock-text ${s.cls}">${s.text}</span>
          <div class="qty-row">
            <div class="qty-selector">
              <button data-action="dec" aria-label="Decrease quantity">−</button>
              <span data-role="qtyval">${qty}</span>
              <button data-action="inc" aria-label="Increase quantity">+</button>
            </div>
            <button class="add-cart-btn" data-action="addcart" ${p.stock === 'out' ? 'disabled' : ''}>
              <i class="fa-solid fa-cart-plus"></i> ${p.stock === 'out' ? 'Unavailable' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>`;
  }

  function renderProducts(){
    const grid = document.getElementById('productGrid');
    const term = state.searchTerm.trim().toLowerCase();
    const filtered = PRODUCTS.filter(p => {
      const matchCat = state.activeFilter === 'all' || p.cat === state.activeFilter;
      const matchTerm = !term || p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term) || CATEGORIES.find(c=>c.id===p.cat).name.toLowerCase().includes(term);
      return matchCat && matchTerm;
    });
    grid.innerHTML = filtered.map(productCardHTML).join('');
    document.getElementById('noResults').hidden = filtered.length > 0;
    attachProductCardEvents();
  }

  function renderGallery(){
    document.getElementById('galleryGrid').innerHTML = GALLERY.map((g,i) => `
      <div class="gallery-item" data-index="${i}" data-label="${g.label}">
        <img src="${g.img}" alt="${g.label}" loading="lazy">
      </div>`).join('');
    document.getElementById('galleryGrid').querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(Number(item.dataset.index)));
    });
  }

  function renderFAQ(){
    document.getElementById('faqList').innerHTML = FAQS.map((f,i) => `
      <div class="faq-item" data-index="${i}">
        <div class="faq-q">${f.q} <i class="fa-solid fa-plus"></i></div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('');
    document.querySelectorAll('.faq-item').forEach(item => {
      item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
    });
  }

  /* ================= 8. SEARCH ================= */
  function initSearch(){
    document.getElementById('searchInput').addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      renderProducts();
    });
  }

  /* ================= 9. QUANTITY + WISHLIST (delegated on product grid) ================= */
  function attachProductCardEvents(){
    document.querySelectorAll('.product-card').forEach(card => {
      const id = Number(card.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);

      card.querySelector('[data-action="inc"]').addEventListener('click', () => {
        state.qtyDraft[id] = (state.qtyDraft[id] || 1) + 1;
        card.querySelector('[data-role="qtyval"]').textContent = state.qtyDraft[id];
      });
      card.querySelector('[data-action="dec"]').addEventListener('click', () => {
        state.qtyDraft[id] = Math.max(1, (state.qtyDraft[id] || 1) - 1);
        card.querySelector('[data-role="qtyval"]').textContent = state.qtyDraft[id];
      });
      card.querySelector('[data-action="wishlist"]').addEventListener('click', (e) => {
        toggleWishlist(id);
        e.currentTarget.classList.toggle('active', state.wishlist.includes(id));
      });
      const addBtn = card.querySelector('[data-action="addcart"]');
      if (addBtn) addBtn.addEventListener('click', () => addToCart(id, state.qtyDraft[id] || 1));
      card.querySelector('[data-action="quickview"]').addEventListener('click', () => openQuickView(product));
    });
  }

  function toggleWishlist(id){
    const idx = state.wishlist.indexOf(id);
    if (idx > -1) state.wishlist.splice(idx,1); else state.wishlist.push(id);
    localStorage.setItem('purexWishlist', JSON.stringify(state.wishlist));
  }

  /* ================= 10. CART ================= */
  function saveCart(){ localStorage.setItem('purexCart', JSON.stringify(state.cart)); }

  function addToCart(id, qty){
    const existing = state.cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else state.cart.push({ id, qty });
    saveCart();
    renderCart();
    openCartDrawer();
  }

  function updateCartQty(id, delta){
    const item = state.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) state.cart = state.cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
  }

  function removeFromCart(id){
    state.cart = state.cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
  }

  function cartTotals(){
    const items = state.cart.map(i => ({ ...i, product: PRODUCTS.find(p => p.id === i.id) })).filter(i => i.product);
    const subtotal = items.reduce((sum,i) => sum + i.product.price * i.qty, 0);
    const delivery = subtotal === 0 ? 0 : (subtotal >= 3000 ? 0 : 150);
    const grandTotal = subtotal + delivery;
    return { items, subtotal, delivery, grandTotal };
  }

  function renderCart(){
    const { items, subtotal, delivery, grandTotal } = cartTotals();
    const container = document.getElementById('cartItems');
    document.getElementById('cartCount').textContent = items.reduce((s,i) => s + i.qty, 0);

    container.innerHTML = items.length ? items.map(i => `
      <div class="cart-item" data-id="${i.id}">
        <img src="${i.product.img}" alt="${i.product.name}">
        <div class="cart-item-info">
          <h5>${i.product.name}</h5>
          <span class="price">Rs. ${(i.product.price * i.qty).toLocaleString()}</span>
          <div class="cart-item-actions">
            <div class="qty-selector">
              <button data-action="cart-dec">−</button>
              <span>${i.qty}</span>
              <button data-action="cart-inc">+</button>
            </div>
            <button class="remove-item" data-action="cart-remove">Remove</button>
          </div>
        </div>
      </div>`).join('') : `<p class="empty-cart">Your cart is empty. Start adding some premium hygiene products!</p>`;

    document.getElementById('cartSubtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
    document.getElementById('cartDelivery').textContent = delivery === 0 ? 'Free' : `Rs. ${delivery.toLocaleString()}`;
    document.getElementById('cartGrandTotal').textContent = `Rs. ${grandTotal.toLocaleString()}`;

    container.querySelectorAll('.cart-item').forEach(el => {
      const id = Number(el.dataset.id);
      el.querySelector('[data-action="cart-inc"]').addEventListener('click', () => updateCartQty(id, 1));
      el.querySelector('[data-action="cart-dec"]').addEventListener('click', () => updateCartQty(id, -1));
      el.querySelector('[data-action="cart-remove"]').addEventListener('click', () => removeFromCart(id));
    });
  }

  function openCartDrawer(){
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('show');
  }
  function closeCartDrawer(){
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('show');
  }

  function initCartUI(){
    document.getElementById('cartToggle').addEventListener('click', openCartDrawer);
    document.getElementById('closeCart').addEventListener('click', closeCartDrawer);
    document.getElementById('drawerOverlay').addEventListener('click', () => {
      closeCartDrawer();
      closeAllModals();
    });
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      if (state.cart.length === 0) return;
      closeCartDrawer();
      openCheckout();
    });
  }

  /* ================= 11. QUICK VIEW MODAL ================= */
  function openQuickView(p){
    const s = stockLabel(p.stock);
    document.getElementById('quickViewModal').innerHTML = `
      <button class="modal-close" id="closeQuickView" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      <div class="qv-body">
        <img src="${p.img}" alt="${p.name}">
        <div>
          <span class="product-cat">${CATEGORIES.find(c=>c.id===p.cat).name}</span>
          <h3 style="margin:8px 0 10px;">${p.name}</h3>
          <p class="muted" style="margin-bottom:14px;">${p.desc}</p>
          <div class="price-row" style="margin-bottom:10px;">
            <span class="price-now" style="font-size:1.4rem;">Rs. ${p.price.toLocaleString()}</span>
            ${p.old ? `<span class="price-old">Rs. ${p.old.toLocaleString()}</span>` : ''}
          </div>
          <span class="stock-text ${s.cls}">${s.text}</span>
          <div class="qty-row" style="margin-top:20px;">
            <div class="qty-selector">
              <button id="qvDec">−</button><span id="qvQty">1</span><button id="qvInc">+</button>
            </div>
            <button class="add-cart-btn" id="qvAdd" ${p.stock==='out' ? 'disabled':''}><i class="fa-solid fa-cart-plus"></i> ${p.stock==='out' ? 'Unavailable' : 'Add to Cart'}</button>
          </div>
        </div>
      </div>`;
    let qty = 1;
    document.getElementById('qvInc').addEventListener('click', () => { qty++; document.getElementById('qvQty').textContent = qty; });
    document.getElementById('qvDec').addEventListener('click', () => { qty = Math.max(1,qty-1); document.getElementById('qvQty').textContent = qty; });
    document.getElementById('qvAdd').addEventListener('click', () => { addToCart(p.id, qty); closeAllModals(); });
    document.getElementById('closeQuickView').addEventListener('click', closeAllModals);
    document.getElementById('quickViewOverlay').classList.add('show');
  }

  /* ================= 12. LIGHTBOX ================= */
  function openLightbox(index){
    state.currentGalleryIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox').hidden = false;
  }
  function updateLightboxImage(){
    const g = GALLERY[state.currentGalleryIndex];
    const img = document.getElementById('lightboxImg');
    img.src = g.img; img.alt = g.label;
  }
  function initLightbox(){
    document.getElementById('lightboxClose').addEventListener('click', () => document.getElementById('lightbox').hidden = true);
    document.getElementById('lightboxNext').addEventListener('click', () => {
      state.currentGalleryIndex = (state.currentGalleryIndex + 1) % GALLERY.length;
      updateLightboxImage();
    });
    document.getElementById('lightboxPrev').addEventListener('click', () => {
      state.currentGalleryIndex = (state.currentGalleryIndex - 1 + GALLERY.length) % GALLERY.length;
      updateLightboxImage();
    });
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') document.getElementById('lightbox').hidden = true;
    });
  }

  /* ================= 13. TESTIMONIALS SLIDER ================= */
  function initTestimonialSlider(){
    const track = document.getElementById('testimonialTrack');
    const cards = track.children;
    const dotsWrap = document.getElementById('sliderDots');
    let idx = 0;
    for (let i=0;i<cards.length;i++){
      const dot = document.createElement('span');
      if (i===0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    function goTo(i){
      idx = i;
      track.style.transform = `translateX(-${idx*100}%)`;
      [...dotsWrap.children].forEach((d,j) => d.classList.toggle('active', j===idx));
    }
    setInterval(() => goTo((idx+1) % cards.length), 6000);
  }

  /* ================= 15. NEWSLETTER + CONTACT FORM ================= */
  function initNewsletter(){
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletterEmail');
      if (input.checkValidity()){
        input.value = '';
        input.placeholder = 'Subscribed! Thank you 🎉';
      }
    });
  }

  function initContactForm(){
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      [...form.querySelectorAll('input,textarea')].forEach(f => f.classList.add('touched'));
      if (form.checkValidity()){
        status.textContent = 'Message sent! Our team will get back to you within 24 hours.';
        status.className = 'form-status ok';
        form.reset();
        [...form.querySelectorAll('input,textarea')].forEach(f => f.classList.remove('touched'));
      } else {
        status.textContent = 'Please fill all fields correctly before sending.';
        status.className = 'form-status err';
      }
    });
  }

  /* ================= 16. TRACK ORDER (simulation) ================= */
  function initTrackOrder(){
    document.getElementById('trackBtn').addEventListener('click', () => {
      const val = document.getElementById('trackInput').value.trim();
      const resultBox = document.getElementById('trackResult');
      if (!val){ resultBox.hidden = true; return; }

      // Deterministic pseudo-status based on characters in the order id,
      // so the same ID always shows the same simulated stage.
      const hash = [...val].reduce((s,c) => s + c.charCodeAt(0), 0);
      const stageIndex = hash % 4; // 0..3 -> which stage is "current"
      const stages = ['Order Confirmed','Packed','Out for Delivery','Delivered'];

      resultBox.hidden = false;
      resultBox.innerHTML = `
        <p><strong>Order ID:</strong> ${val.toUpperCase()}</p>
        <p class="muted small">This is a simulated status for demo purposes.</p>
        <div class="track-steps">
          ${stages.map((s,i) => `
            <div class="ts ${i<=stageIndex ? 'done':''}">
              <span class="dot"><i class="fa-solid ${i<=stageIndex ? 'fa-check':'fa-circle'}"></i></span>
              ${s}
            </div>`).join('')}
        </div>`;
    });
  }

  /* ================= 17. CHECKOUT FLOW ================= */
  function openCheckout(){
    document.getElementById('checkoutOverlay').classList.add('show');
    goToStep(1);
  }
  function closeAllModals(){
    document.getElementById('checkoutOverlay').classList.remove('show');
    document.getElementById('quickViewOverlay').classList.remove('show');
  }

  function goToStep(step){
    document.querySelectorAll('.checkout-step-panel').forEach(p => p.hidden = String(p.dataset.panel) !== String(step));
    document.querySelectorAll('.checkout-steps .step').forEach(s => s.classList.toggle('active', Number(s.dataset.step) === step));
    if (step === 4) renderOrderSummary();
  }

  function renderOrderSummary(){
    const { items, subtotal, delivery, grandTotal } = cartTotals();
    const payment = document.querySelector('input[name="payment"]:checked')?.value || 'COD';
    const loc = state.checkoutLocation;
    document.getElementById('orderSummary').innerHTML = `
      ${items.map(i => `<div class="os-row"><span>${i.product.name} × ${i.qty}</span><span>Rs. ${(i.product.price*i.qty).toLocaleString()}</span></div>`).join('')}
      <div class="os-row"><span>Delivery Charges</span><span>${delivery === 0 ? 'Free' : 'Rs. ' + delivery.toLocaleString()}</span></div>
      <div class="os-row"><span>Taxes</span><span>Included</span></div>
      <div class="os-row os-total"><span>Grand Total</span><span>Rs. ${grandTotal.toLocaleString()}</span></div>
      <div class="os-row"><span>Payment Method</span><span>${payment}</span></div>
      <div class="os-row"><span>Delivery Location</span><span>${loc ? loc.region : 'Not set'}</span></div>`;
  }

  function generateOrderId(){
    return 'PXT-' + Math.floor(10000 + Math.random()*89999);
  }

  function initCheckout(){
    document.getElementById('closeCheckout').addEventListener('click', closeAllModals);

    document.querySelectorAll('.step-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const goto = btn.dataset.goto;

        // validate step 1 (customer details form)
        if (goto === '2' && btn.closest('[data-panel="1"]')){
          const form = document.getElementById('checkoutForm');
          if (!form.checkValidity()){ form.reportValidity(); return; }
        }
        // validate step 2 -> 3 requires a confirmed Pakistan location
        if (goto === '3' && btn.id === 'confirmLocationBtn'){
          if (!state.checkoutLocation){
            document.getElementById('mapWarning').hidden = false;
            return;
          }
        }
        goToStep(Number(goto));
      });
    });

    initMapPicker();

    document.getElementById('placeOrderBtn').addEventListener('click', () => {
      const orderId = generateOrderId();
      document.getElementById('generatedOrderId').textContent = orderId;
      goToStep('done');
      // clear cart after successful order
      state.cart = [];
      saveCart();
      renderCart();
    });

    document.getElementById('closeSuccessBtn').addEventListener('click', () => {
      closeAllModals();
      document.getElementById('checkoutForm').reset();
      state.checkoutLocation = null;
      document.getElementById('checkoutPin').hidden = true;
      document.getElementById('mapLat').textContent = '—';
      document.getElementById('mapLng').textContent = '—';
      document.getElementById('mapRegion').textContent = '—';
    });
  }

  /* Pakistan map picker — simplified simulation.
     Real Google Maps embedding requires a billing-enabled API key, which this
     environment cannot provision, so a static map image is used with click
     coordinates converted into an approximate lat/lng + region label,
     and clicks outside the country's silhouette area are rejected. */
  function initMapPicker(){
    const map = document.getElementById('checkoutMap');
    const pin = document.getElementById('checkoutPin');
    map.addEventListener('click', (e) => {
      const rect = map.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const fx = x / rect.width;   // 0..1 across the image
      const fy = y / rect.height;  // 0..1 down the image

      // Reject clicks near the image edges (outside Pakistan's silhouette)
      const insideCountry = fx > 0.08 && fx < 0.95 && fy > 0.05 && fy < 0.97;
      if (!insideCountry){
        document.getElementById('mapWarning').hidden = false;
        return;
      }
      document.getElementById('mapWarning').hidden = true;

      // Rough bounding box of Pakistan: lat 23.5–37.1, lng 60.9–77.8
      const lat = (37.1 - fy * (37.1 - 23.5)).toFixed(4);
      const lng = (60.9 + fx * (77.8 - 60.9)).toFixed(4);

      let region = 'Central Pakistan';
      if (fy < 0.35) region = fx < 0.5 ? 'Northern KPK / Gilgit-Baltistan region' : 'Northern Punjab / Azad Kashmir region';
      else if (fy < 0.65) region = fx < 0.45 ? 'Balochistan region' : 'Central Punjab region';
      else region = fx < 0.5 ? 'Southern Balochistan region' : 'Sindh region';

      pin.style.left = x + 'px';
      pin.style.top = y + 'px';
      pin.hidden = false;

      document.getElementById('mapLat').textContent = lat;
      document.getElementById('mapLng').textContent = lng;
      document.getElementById('mapRegion').textContent = region;

      state.checkoutLocation = { lat, lng, region };
    });
  }

  /* ================= INIT EVERYTHING ================= */
  initLoader();
  initScrollUX();
  initNavMenu();
  initClock();
  initDarkMode();
  initClickSounds();

  renderCategories();
  renderOffers();
  renderProducts();
  renderGallery();
  renderFAQ();

  initSearch();
  initCartUI();
  renderCart();
  initLightbox();
  initTestimonialSlider();
  initNewsletter();
  initContactForm();
  initTrackOrder();
  initCheckout();

  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('privacyLink').addEventListener('click', (e) => { e.preventDefault(); alert('Privacy Policy: Purex Tissues collects only the information needed to process and deliver your order, and never sells customer data to third parties.'); });
  document.getElementById('termsLink').addEventListener('click', (e) => { e.preventDefault(); alert('Terms & Conditions: Orders are subject to stock availability. Prices are listed in PKR and may change without prior notice.'); });
});
