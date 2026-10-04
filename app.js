const API = "https://fusion-api-mu.vercel.app/api";
const COUPONS = { WELCOME50: 0.5, HEALTHY10: 0.1, FUSION20: 0.2 };
const DELIVERY_FEE = 40;
const FREE_DELIVERY_ABOVE = 999;
const SPRITE = "images/icons/sprite.svg";

document.documentElement.classList.add("js");

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];
const getParam = (name) => new URLSearchParams(location.search).get(name);
const money = (n) => "₹" + Number(n).toLocaleString("en-IN");

function getSaved(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
}
function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
}

function icon(name, extra = "") {
    return `<svg class="icon ${extra}" aria-hidden="true"><use href="${SPRITE}#icon-${name}"></use></svg>`;
}

function toast(message) {
    let box = $("#fusion-toast");
    if (!box) {
        box = document.createElement("div");
        box.id = "fusion-toast";
        box.setAttribute("role", "status");
        box.style.cssText =
            "position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(120%);" +
            "background:var(--gradient-primary);color:#fff;padding:0.85rem 1.6rem;" +
            "border-radius:var(--radius-full);box-shadow:var(--shadow-lg);z-index:2000;" +
            "font-weight:600;transition:transform .4s;";
        document.body.appendChild(box);
    }
    box.textContent = message;
    box.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        box.style.transform = "translateX(-50%) translateY(120%)";
    }, 2200);
}

async function getJSON(path) {
    const res = await fetch(API + path);
    if (!res.ok) throw new Error("API error " + res.status);
    return res.json();
}


const getCart = () => getSaved("fusion_cart_v1", []);          
const getWishlist = () => getSaved("fusion_wishlist_v1", []);  

function saveCart(cart) {
    save("fusion_cart_v1", cart);
    updateCartBadge();
}

function addToCart(id, qty = 1) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (item) item.qty += qty;
    else cart.push({ id, qty });
    saveCart(cart);
}

function changeQty(id, change) {
    let cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += change;
    cart = cart.filter((i) => i.qty > 0); 
    saveCart(cart);
}

function removeFromCart(id) {
    saveCart(getCart().filter((i) => i.id !== id));
}

function cartCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
    const count = cartCount();
    $$("[data-cart-count]").forEach((el) => {
        el.textContent = count;
        el.style.display = count > 0 ? "" : "none";
    });
}

function toggleWishlist(id) {
    const list = getWishlist();
    const index = list.indexOf(id);
    if (index === -1) list.push(id);
    else list.splice(index, 1);
    save("fusion_wishlist_v1", list);
    return index === -1;
}

function cartTotals(products, couponCode) {
    const lines = [];
    getCart().forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) lines.push({ product, qty: item.qty, lineTotal: product.price * item.qty });
    });
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const rate = COUPONS[(couponCode || "").trim().toUpperCase()] || 0;
    const discount = Math.round(subtotal * rate);
    return { lines, subtotal, delivery, discount, total: subtotal + delivery - discount };
}

function sortProducts(list, sortBy) {
    const copy = [...list];
    if (sortBy === "price-low") copy.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") copy.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") copy.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "protein") copy.sort((a, b) => b.protein - a.protein);
    else if (sortBy === "calories") copy.sort((a, b) => a.calories - b.calories);
    else if (sortBy === "popular") copy.sort((a, b) => b.ratingCount - a.ratingCount);
    return copy;
}

function filterProducts(products, { category, query, sort }) {
    let list = products;
    if (category && category !== "all") list = list.filter((p) => p.categorySlug === category);
    if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        list = list.filter((p) =>
            (p.name + " " + p.category + " " + p.description).toLowerCase().includes(q));
    }
    return sortProducts(list, sort);
}

function emptyBox(message, link, linkText) {
    return `<div class="text-center" style="padding:var(--space-2xl) var(--space-md);grid-column:1/-1;">
        <div class="icon-badge icon-badge--glass icon-badge--lg" style="margin-inline:auto;">${icon("cart", "icon--lg")}</div>
        <p class="mt-md">${message}</p>
        ${link ? `<a href="${link}" class="btn btn--primary mt-sm">${linkText}</a>` : ""}
    </div>`;
}


function productImage(p) {
    if (p.image1) {
        return `<div class="product-card__photo" role="img" aria-label="${p.name}"
            style="--product-img-1:url('${p.image1}');--product-img-2:url('${p.image2 || p.image1}');"></div>`;
    }
    return `<div class="icon-banner icon-banner--${p.gradient}">${icon(p.icon, "icon--xl")}</div>`;
}

function badges(list) {
    return (list || []).map((b) => `<span class="badge badge--${b}">${b}</span>`).join("");
}

function priceHtml(p) {
    let html = `<span class="product-card__price">₹${p.price}`;
    if (p.oldPrice) {
        const save = Math.round((1 - p.price / p.oldPrice) * 100);
        html += ` <small>₹${p.oldPrice}</small><span class="product-card__save">Save ${save}%</span>`;
    }
    return html + "</span>";
}

function productCard(p) {
    const liked = getWishlist().includes(p.id);
    return `<article class="product-card anim-fade-up" data-product-id="${p.id}">
        <a class="product-card__link" href="singlepage.html?id=${p.id}" aria-label="View ${p.name}">
            <div class="product-card__media">
                <div class="product-card__badges">${badges(p.badges)}</div>
                <button type="button" class="product-card__fav ${liked ? "is-active" : ""}"
                    aria-pressed="${liked}" aria-label="Toggle wishlist for ${p.name}"
                    data-action="toggle-favorite" data-product-id="${p.id}">
                    ${icon("heart", "icon--sm" + (liked ? " icon--filled" : ""))}
                </button>
                ${productImage(p)}
            </div>
        </a>
        <div class="product-card__body">
            <span class="product-card__category">${p.category}</span>
            <h3 class="product-card__name"><a href="singlepage.html?id=${p.id}">${p.name}</a></h3>
            <p class="product-card__desc">${p.description}</p>
            <div class="product-card__tags">
                <span class="tag">Protein ${p.protein}g</span><span class="tag">${p.calories} kcal</span>
            </div>
            <div class="product-card__meta">
                <span class="rating">${icon("star", "icon--xs icon--filled")} ${p.rating}
                    <span class="rating__count">(${p.ratingCount})</span></span>
                <span>${icon("clock", "icon--xs")} ${p.deliveryTime}</span>
            </div>
            <div class="product-card__footer">${priceHtml(p)}</div>
        </div>
        <div class="product-card__actions">
            <button type="button" class="btn btn--cart btn--sm btn--block" data-action="add-to-cart" data-product-id="${p.id}">
                ${icon("cart", "icon--sm")} Add To Cart</button>
            <a class="btn btn--ghost btn--sm" href="singlepage.html?id=${p.id}" aria-label="View details of ${p.name}">
                ${icon("eye", "icon--sm")}</a>
        </div>
    </article>`;
}

function flipCard(p, autoFlip) {
    return `<article class="product-card ${autoFlip ? "product-card--auto-flip" : "product-card--flip-hover"} flip-card anim-fade-up">
        ${autoFlip ? '<span class="special-ribbon">Special</span>' : ""}
        <div class="flip-card__inner">
            <div class="flip-card__face">
                ${productImage(p)}
                <div class="product-card__body">
                    <h3 class="product-card__name">${p.name}</h3>
                    ${priceHtml(p)}
                    <span class="tag">${p.calories} kcal</span>
                </div>
            </div>
            <div class="flip-card__face flip-card__face--back">
                <h4>${p.name}</h4>
                <p>${p.description}</p>
                <ul class="flip-card__macros">
                    <li>Protein: ${p.protein}g</li><li>Carbs: ${p.carbs}g</li><li>Fat: ${p.fat}g</li>
                </ul>
                <p>${p.benefits}</p>
                <button type="button" class="btn btn--accent btn--sm" data-action="add-to-cart" data-product-id="${p.id}">Add To Cart</button>
            </div>
        </div>
    </article>`;
}

function categoryCard(c, countText) {
    const link = c.isPlan ? "subscription.html" : "products.html?category=" + c.slug;
    return `<a class="category-card anim-fade-up bg-gradient-${c.gradient}" href="${link}">
        ${icon(c.icon, "category-card__icon")}
        <span class="category-card__count">${countText}</span>
        <h2 class="category-card__name">${c.name}</h2>
        <p class="category-card__desc">${c.desc}</p>
    </a>`;
}

function macroBar(cssClass, label, value, percent) {
    return `<div class="macro">
        <span class="macro__label"><span>${label}</span><span>${value}</span></span>
        <div class="macro__bar ${cssClass}"><span style="width:${Math.min(percent, 100)}%"></span></div>
    </div>`;
}

function nutritionCard(p) {
    return `<article class="nutrition-card anim-fade-up">
        <div class="flex flex--between">
            <div class="icon-badge icon-badge--sm icon-badge--${p.gradient}">${icon(p.icon)}</div>
            ${badges(p.badges)}
        </div>
        <h3 style="font-size:var(--fs-md);">${p.name}</h3>
        <span class="tag">${p.category}</span>
        <div class="nutrition-card__macros">
            ${macroBar("macro__bar--protein", "Protein", p.protein + "g", p.protein * 2.8)}
            ${macroBar("macro__bar--carbs", "Carbs", p.carbs + "g", p.carbs * 1.8)}
            ${macroBar("macro__bar--fat", "Fat", p.fat + "g", p.fat * 3.2)}
            ${macroBar("macro__bar--fiber", "Fiber", p.fiber + "g", p.fiber * 9)}
        </div>
        <div class="product-card__meta"><span>${p.calories} kcal</span><span>Sugar: ${p.sugar}g</span></div>
    </article>`;
}

function cartItem(line) {
    const p = line.product;
    const thumb = p.image1
        ? `<div class="icon-badge icon-badge--photo" style="background-image:url('${p.image1}')" role="img" aria-label="${p.name}"></div>`
        : `<div class="icon-badge icon-badge--${p.gradient}">${icon(p.icon, "icon--lg")}</div>`;
    return `<article class="cart-item anim-fade-up">
        ${thumb}
        <div>
            <h3 style="font-size:var(--fs-md);"><a href="singlepage.html?id=${p.id}">${p.name}</a></h3>
            <span class="tag">${p.category}</span>
            <div class="stepper mt-sm" data-product-id="${p.id}">
                <button type="button" data-action="decrement-qty" aria-label="Decrease quantity">${icon("minus", "icon--sm")}</button>
                <output>${line.qty}</output>
                <button type="button" data-action="increment-qty" aria-label="Increase quantity">${icon("plus", "icon--sm")}</button>
            </div>
        </div>
        <div class="text-center">
            <p class="product-card__price">₹${line.lineTotal}</p>
            <button type="button" class="btn btn--ghost btn--sm mt-sm" data-action="remove-item" data-product-id="${p.id}">Remove</button>
        </div>
    </article>`;
}

function setupToolbar(toolbarSelector, defaultSort, onChange) {
    const toolbar = $(toolbarSelector);
    const state = { query: "", category: "all", sort: defaultSort };
    if (!toolbar) return state;

    toolbar.addEventListener("submit", (e) => e.preventDefault());

    $('input[type="search"]', toolbar).addEventListener("input", (e) => {
        state.query = e.target.value;
        onChange(state);
    });
    $$(".filter-chip", toolbar).forEach((chip) => {
        chip.addEventListener("click", () => {
            $$(".filter-chip", toolbar).forEach((c) => c.setAttribute("aria-pressed", "false"));
            chip.setAttribute("aria-pressed", "true");
            state.category = chip.dataset.filter;
            onChange(state);
        });
    });
    $("select", toolbar).addEventListener("change", (e) => {
        state.sort = e.target.value;
        onChange(state);
    });
    return state;
}

function homePage(products) {
    const special = $("#home-special-grid");
    if (special) {
        const specials = products.filter((p) => p.special).slice(0, 3);
        const extra = products.find((p) => !p.special);
        let html = specials.map((p, i) => flipCard(p, i === 0)).join("");
        if (extra) html += flipCard(extra, false);
        special.innerHTML = html;
    }
    const best = $("#home-bestsellers-grid");
    if (best) {
        best.innerHTML = sortProducts(products, "popular").slice(0, 4).map(productCard).join("");
    }
    // header search box on the home page -> go to Meals page
    const search = $("#header-search-input");
    if (search) {
        search.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                location.href = "products.html?q=" + encodeURIComponent(search.value);
            }
        });
    }
}

function categoriesPage(products, categories) {
    const grid = $("#category-grid");
    if (!grid) return;
    grid.innerHTML = categories.map((c) => {
        let countText;
        if (c.isPlan) countText = c.slug === "weekly-plans" ? "7 Meals" : "30 Meals";
        else countText = products.filter((p) => p.categorySlug === c.slug).length + " Items";
        return categoryCard(c, countText);
    }).join("");
}

function productsPage(products) {
    const grid = $("#product-grid");
    if (!grid) return;

    function show(state) {
        const list = filterProducts(products, state);
        grid.innerHTML = list.length
            ? list.map(productCard).join("")
            : emptyBox("No meals match your search or filters.", "products.html", "Reset");
    }

    const state = setupToolbar("#product-toolbar", "popular", show);

    // ?category=salads&q=rice in the URL
    const category = getParam("category");
    const query = getParam("q");
    if (category) {
        state.category = category;
        $$("#category-filter .filter-chip").forEach((chip) => {
            chip.setAttribute("aria-pressed", chip.dataset.filter === category ? "true" : "false");
        });
    }
    if (query) {
        state.query = query;
        $("#product-search").value = query;
    }
    show(state);
}

function nutritionPage(products) {
    const grid = $("#nutrition-grid");
    if (!grid) return;

    function show(state) {
        const list = filterProducts(products, state);
        grid.innerHTML = list.length
            ? list.map(nutritionCard).join("")
            : emptyBox("No meals match your search or filters.", "nutrition.html", "Reset");
    }
    show(setupToolbar("#nutrition-toolbar", "default", show));
}

async function singlePage(products) {
    if (!$("#product-info")) return;

    const id = getParam("id") || products[0].id;
    const p = products.find((x) => x.id === id) || products[0];

    document.title = p.name + " | FUSION — A Healthy Lifestyle";
    $("#breadcrumb-current").textContent = p.name;
    $("#product-category-label").textContent = p.category;
    $("#product-title").textContent = p.name;
    $("#product-rating").innerHTML =
        `${icon("star", "icon--xs icon--filled")} ${p.rating} <span class="rating__count">(${p.ratingCount} reviews)</span>`;
    $("#product-description").textContent = p.description;
    $("#product-price").textContent = "₹" + p.price;
    $("#product-delivery").textContent = "Delivery in " + p.deliveryTime;

    // gallery
    const gallery = $("#product-gallery");
    const thumb1 = $("#gallery-thumb-1");
    const thumb2 = $("#gallery-thumb-2");
    $("#gallery-main-frame").className = "gallery__frame icon-banner icon-banner--" + p.gradient;
    if (p.image1) {
        gallery.classList.remove("gallery--icon-only");
        gallery.style.setProperty("--product-img-1", `url('${p.image1}')`);
        gallery.style.setProperty("--product-img-2", `url('${p.image2 || p.image1}')`);
        $("#gallery-icon-main").style.display = "none";
        thumb1.hidden = false;
        thumb2.hidden = false;
        thumb1.onclick = () => { thumb1.classList.add("is-active"); thumb2.classList.remove("is-active"); };
        thumb2.onclick = () => { thumb2.classList.add("is-active"); thumb1.classList.remove("is-active"); };
    } else {
        gallery.classList.add("gallery--icon-only");
        $("#gallery-icon-main use").setAttribute("href", `${SPRITE}#icon-${p.icon}`);
        thumb1.hidden = true;
        thumb2.hidden = true;
    }

    // nutrition + tabs
    $("#nutrition-summary-macros").innerHTML =
        macroBar("macro__bar--protein", "Protein", p.protein + "g", p.protein * 2.8) +
        macroBar("macro__bar--carbs", "Carbs", p.carbs + "g", p.carbs * 1.8) +
        macroBar("macro__bar--fat", "Fat", p.fat + "g", p.fat * 3.2) +
        macroBar("", "Calories", p.calories + " kcal", p.calories / 6);
    $("#tab-ingredients").textContent = p.ingredients;
    $("#tab-preparation").textContent = p.preparation;
    $("#tab-benefits").textContent = p.benefits;
    $("#tab-serving").innerHTML = `<strong>Serving Size:</strong> ${p.servingSize} &nbsp; <strong>Allergens:</strong> ${p.allergens}`;
    $("#tab-delivery").textContent =
        "Delivered in insulated, eco-friendly packaging. Estimated delivery: " + p.deliveryTime + " from order confirmation.";

    // give the main buttons this product's id
    ["#main-add-to-cart-btn", "#buy-now-btn", "#product-wishlist-btn"].forEach((sel) => {
        const btn = $(sel);
        if (btn) btn.dataset.productId = p.id;
    });
    const fav = $("#product-wishlist-btn");
    if (fav) {
        const liked = getWishlist().includes(p.id);
        fav.classList.toggle("is-active", liked);
        fav.setAttribute("aria-pressed", liked);
    }

    // related meals (same category first)
    const related = $("#related-meals-grid");
    if (related) {
        const others = products.filter((x) => x.id !== p.id);
        const sameCategory = others.filter((x) => x.categorySlug === p.categorySlug);
        const rest = others.filter((x) => x.categorySlug !== p.categorySlug);
        related.innerHTML = sameCategory.concat(rest).slice(0, 4).map(productCard).join("");
    }
}

// cart page — returns a function that redraws the cart
function cartPage(products) {
    const itemsBox = $("#cart-items");
    if (!itemsBox) return null;

    function draw() {
        const coupon = $("#coupon-code").value;
        const t = cartTotals(products, coupon);

        itemsBox.innerHTML = t.lines.length
            ? t.lines.map(cartItem).join("")
            : emptyBox("Your cart is empty.", "products.html", "Browse Meals");

        $("#cart-subtotal").textContent = money(t.subtotal);
        $("#cart-delivery").textContent = t.delivery === 0 ? "Free" : money(t.delivery);
        $("#cart-discount").textContent = "−" + money(t.discount);
        $("#cart-total").textContent = money(t.total);
        $("#cart-item-count").textContent = cartCount();
    }
    draw();
    return draw;
}

function profilePage(products) {
    const box = $("#favorite-meals-grid");
    if (!box) return;
    const liked = getWishlist();
    const favorites = products.filter((p) => liked.includes(p.id));
    box.innerHTML = favorites.length
        ? favorites.map(productCard).join("")
        : emptyBox("No favorite meals yet — tap the heart on any meal to save it here.", "products.html", "Browse Meals");
}

/* ---------- small features that need no data ---------- */
function setupTheme() {
    const btn = $("#theme-toggle");
    if (!btn) return;
    const root = document.documentElement;

    function apply(theme) {
        root.setAttribute("data-theme", theme);
        btn.setAttribute("aria-pressed", theme === "dark");
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    apply(root.getAttribute("data-theme") || "light");

    btn.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        try { localStorage.setItem("fusion_theme", next); } catch (e) { }
        apply(next);
    });
}

function setupNavbar() {
    // close the mobile menu when a link is clicked
    const toggle = $("#nav-toggle");
    $$(".navbar__menu a").forEach((a) => a.addEventListener("click", () => { if (toggle) toggle.checked = false; }));

    // desktop dropdowns open on click
    const dropdowns = $$(".navbar__dropdown");
    const closeAll = () => dropdowns.forEach((d) => d.classList.remove("is-open"));

    dropdowns.forEach((d) => {
        const link = d.querySelector(":scope > a");
        link.addEventListener("click", (e) => {
            if (matchMedia("(max-width: 767px)").matches) return;   // mobile: follow the link
            e.preventDefault();
            const wasOpen = d.classList.contains("is-open");
            closeAll();
            if (!wasOpen) d.classList.add("is-open");
        });
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".navbar__dropdown")) closeAll(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
}

// fade elements in when they scroll into view
function setupReveal() {
    const items = $$(".reveal, .reveal-stagger");
    if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
    }
    const watcher = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                watcher.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach((el) => watcher.observe(el));
}

// About page numbers count up: <span data-counter data-target="250" data-decimals="1" data-suffix="+">
function setupCounters() {
    $$("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / 1500, 1);
            el.textContent = (target * progress).toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}

// About page blog filter
function setupBlogFilter() {
    const group = $("#blog-category-filter");
    if (!group) return;
    $$(".filter-chip", group).forEach((chip) => {
        chip.addEventListener("click", () => {
            $$(".filter-chip", group).forEach((c) => c.setAttribute("aria-pressed", "false"));
            chip.setAttribute("aria-pressed", "true");
            const filter = chip.dataset.filter;
            $$("#blog-grid > article").forEach((card) => {
                card.style.display = filter === "all" || card.dataset.category === filter ? "" : "none";
            });
        });
    });
}

/* ---------- 6) CLICKS & FORMS ---------- */
// One click listener handles every button with data-action="..."
function setupClicks(redrawCart) {
    document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.productId;
        const qtyBox = $("#qty-input");                       // quantity on the single product page
        const chosenQty = qtyBox ? parseInt(qtyBox.textContent, 10) || 1 : 1;

        if (action === "add-to-cart") {
            addToCart(id, btn.id === "main-add-to-cart-btn" ? chosenQty : 1);
            toast("Added to cart");
        }
        else if (action === "buy-now") {
            addToCart(id, chosenQty);
            location.href = "cart.html";
        }
        else if (action === "toggle-favorite") {
            e.preventDefault();   // the heart sits inside a link on cards
            const liked = toggleWishlist(id);
            btn.classList.toggle("is-active", liked);
            btn.setAttribute("aria-pressed", liked);
            const svg = btn.querySelector("svg");
            if (svg) svg.classList.toggle("icon--filled", liked);
            toast(liked ? "Added to wishlist" : "Removed from wishlist");
        }
        else if (action === "increment-qty" || action === "decrement-qty") {
            const change = action === "increment-qty" ? 1 : -1;
            const stepper = btn.closest(".stepper");
            if (stepper.dataset.productId) {                  // stepper inside the cart
                changeQty(stepper.dataset.productId, change);
                if (redrawCart) redrawCart();
            } else {                                          // stepper on the product page
                const output = stepper.querySelector("output");
                output.textContent = Math.max(1, (parseInt(output.textContent, 10) || 1) + change);
            }
        }
        else if (action === "remove-item") {
            removeFromCart(id);
            toast("Item removed");
            if (redrawCart) redrawCart();
        }
        else if (action === "apply-coupon") {
            const code = $("#coupon-code").value.trim().toUpperCase();
            toast(COUPONS[code] ? "Coupon applied!" : "Invalid coupon code");
            if (redrawCart) redrawCart();
        }
        else if (action === "checkout") {
            if (cartCount() === 0) return toast("Your cart is empty");
            saveCart([]);
            toast("Order placed! Redirecting…");
            setTimeout(() => { location.href = "index.html"; }, 1200);
        }
        else if (action === "choose-plan") {
            toast("Plan selected — redirecting to signup");
            setTimeout(() => { location.href = "signup.html"; }, 900);
        }
        else if (action === "google-login" || action === "google-signup") {
            toast("Google sign-in is a placeholder in this demo");
        }
        else if (action === "load-more") toast("You're all caught up for now");
        else if (action === "read-article") toast("Full article view coming soon");
    });

    document.addEventListener("submit", (e) => {
        const form = e.target;
        if (form.id === "newsletter-form") {
            e.preventDefault();
            toast("Subscribed! Check your inbox for healthy recipes.");
            form.reset();
        }
        else if (form.id === "login-form") {
            e.preventDefault();
            toast("Login successful (demo)");
        }
        else if (form.id === "signup-form") {
            e.preventDefault();
            if ($("#signup-password").value !== $("#signup-confirm-password").value) {
                return toast("Passwords do not match");
            }
            toast("Account created (demo)");
        }
    });
}

/* ---------- 7) START ---------- */
document.addEventListener("DOMContentLoaded", async () => {
    // things that don't need product data
    setupTheme();
    setupNavbar();
    setupBlogFilter();
    setupCounters();
    updateCartBadge();

    // the cart page must be able to redraw when buttons are clicked
    let redrawCart = null;
    setupClicks(() => redrawCart && redrawCart());

    try {
        const products = await getJSON("/products");

        homePage(products);
        productsPage(products);
        nutritionPage(products);
        singlePage(products);
        profilePage(products);
        redrawCart = cartPage(products);

        if ($("#category-grid")) {
            const categories = await getJSON("/categories");
            categoriesPage(products, categories);
        }
    } catch (err) {
        console.error(err);
        const message = "Couldn't load data from the FUSION API. Please check your internet and reload.";
        ["#product-grid", "#nutrition-grid", "#home-special-grid", "#home-bestsellers-grid",
            "#category-grid", "#cart-items", "#related-meals-grid"].forEach((sel) => {
                const box = $(sel);
                if (box) box.innerHTML = emptyBox(message);
            });
    }
    setupReveal();
});
