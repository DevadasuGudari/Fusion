# 🥗 FUSION — Healthy Lifestyle

<h1 align="center">🥗 FUSION</h1>

<h3 align="center">
  Eat Better • Live Healthier • Feel Better
</h3>

<p align="center">
  A modern multi-page healthy-food ordering experience built with
  <b>HTML5</b>, <b>CSS3</b> and <b>Vanilla JavaScript</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/API-REST-6DB33F?style=for-the-badge">
  <img src="https://img.shields.io/badge/Storage-localStorage-FF9800?style=for-the-badge">
  <img src="https://img.shields.io/badge/Responsive-Design-9C27B0?style=for-the-badge">
</p>

---

## 🌱 About FUSION

**FUSION** is a modern healthy-food ordering website designed around one simple idea:

> ### 🥗 Make healthy eating simple, informative and enjoyable.

Users can discover healthy meals, explore detailed nutritional information, compare categories, add meals to a cart, save favourites, apply discount coupons, and explore subscription plans.

Unlike a simple static food website, FUSION combines multiple frontend concepts into one complete experience:

```text
             🥗 FUSION
                 │
       ┌─────────┼─────────┐
       │         │         │
      🍱       🧬       🛒
    Meals   Nutrition    Cart
       │         │         │
       └─────────┼─────────┘
                 │
       ┌─────────┼─────────┐
       │         │         │
      ❤️        📦        🌙
  Wishlist   Plans     Theme
                 │
                 ▼
          🌱 Healthy Life
````

---

# ✨ Why FUSION?

FUSION isn't just a food catalogue.

It brings together:

* 🍱 Food discovery
* 🧬 Nutrition information
* 🛒 Shopping cart functionality
* ❤️ Wishlist management
* 🎟️ Coupon system
* 📦 Subscription plans
* 🌙 Theme switching
* 📱 Responsive design
* ♿ Accessibility
* 🔌 REST API integration
* 💾 Browser storage
* ✨ Interactive animations

All of this is built using **plain HTML, CSS and Vanilla JavaScript — without a frontend framework or build step.**

---

# 🚀 Core Features

## 🍱 Smart Meal Catalogue

Discover healthy meals through an interactive catalogue.

* 🔎 Search meals
* 🏷️ Filter by category
* ↕️ Sort by popularity
* 💰 Sort by price
* ⭐ Sort by rating
* 🖼️ Dynamic meal cards
* 🏷️ Meal badges

---

## 🧬 Nutrition Explorer

Understand what's inside every meal before ordering.

### Nutrition information includes:

| 🧪 Nutrition     | 📊 Available |
| ---------------- | ------------ |
| 🔥 Calories      | ✅            |
| 💪 Protein       | ✅            |
| 🍚 Carbohydrates | ✅            |
| 🥑 Fat           | ✅            |
| 🌾 Fiber         | ✅            |
| 🍬 Sugar         | ✅            |

Users can also:

* Search meals
* Filter nutrition data
* Sort by protein
* Sort by calories
* Sort by price
* View macro bars

---

# 🍽️ Single Meal Experience

Every meal gets its own detailed product page.

### Included:

* 🖼️ Image gallery
* ⭐ Rating
* 💰 Price
* 🔢 Quantity selector
* 🛒 Add to Cart
* ⚡ Buy Now
* ❤️ Wishlist
* 🥕 Ingredients
* 👨‍🍳 Preparation
* 💚 Health benefits
* 🍽️ Serving size
* ⚠️ Allergens
* 🚚 Delivery information
* 🍱 Related meals

---

# 🛒 Cart Experience

The cart provides a complete frontend shopping experience.

### Features

* ➕ Increase quantity
* ➖ Decrease quantity
* ❌ Remove products
* 💰 Live subtotal
* 🎟️ Apply coupon
* 🚚 Delivery calculation
* 🎁 Free-delivery threshold
* 🧮 Automatic total calculation

### Cart Flow

```text
🍱 Select Meal
      ↓
🛒 Add to Cart
      ↓
🔢 Change Quantity
      ↓
🎟️ Apply Coupon
      ↓
💰 Calculate Total
      ↓
🚚 Delivery Check
      ↓
✅ Checkout Demo
```

---

# ❤️ Wishlist

Save favourite meals directly in the browser.

```text
❤️ Add Meal
     ↓
💾 localStorage
     ↓
❤️ Wishlist
     ↓
🔄 Available Across Visits
```

Wishlist data is stored using:

```text
fusion_wishlist_v1
```

---

# 🏷️ Categories

The categories page provides an overview of available healthy-food categories.

Each category includes:

* 🍱 Category name
* 📝 Description
* 🎨 Visual styling
* 🔢 Live item count
* 🔗 Link to filtered meals

Example categories include:

```text
🥗 Healthy Salads
🍚 Veg Rice Bowls
🥤 Smoothies
🍱 Healthy Meals
```

---

# 📦 Subscription Plans

FUSION also includes healthy meal subscription options.

### Plans

| Plan       | Purpose                        |
| ---------- | ------------------------------ |
| 🗓️ Weekly | Flexible weekly meals          |
| 📅 Monthly | Regular monthly meal plans     |
| 💎 Diamond | Premium healthy lifestyle plan |

A comparison table helps users understand the differences between plans.

> Subscription selection is currently a **frontend demo**.

---

# 🏠 Home Page

The home page acts as the main entry point into the FUSION experience.

### Includes:

* 🌱 Hero section
* 🥗 Featured categories
* 🔄 Today's Special flip cards
* ⭐ Best sellers
* 💬 Customer reviews
* 💡 Healthy tips
* 📧 Newsletter section

---

# 📖 About FUSION

The About page introduces the story and philosophy behind FUSION.

### Includes:

* 📖 Brand story
* 🎯 Mission
* 🔭 Vision
* 📊 Animated statistics
* 🕐 Timeline
* 👥 Team section
* 📝 Journal / Blog
* 🔎 Blog filtering

---

# 🌙 Theme System

FUSION supports both:

### ☀️ Light Mode

Clean and bright interface for daytime browsing.

### 🌙 Dark Mode

Comfortable dark interface for low-light environments.

The selected theme is remembered between visits.

```text
User Preference
      ↓
fusion_theme
      ↓
localStorage
      ↓
Theme Restored
```

The website also respects the user's **OS theme preference by default**.

---

# ♿ Accessibility

Accessibility is treated as part of the user experience.

FUSION includes:

* Skip navigation link
* ARIA labels
* ARIA live regions
* Keyboard-friendly dropdowns
* `Esc` to close menus
* Responsive navigation
* Semantic HTML
* Accessible interactive elements

---

# ✨ UI & Interaction

FUSION uses several modern frontend interaction patterns.

### 🎴 Flip Cards

Interactive "Today's Special" cards.

### 👀 Scroll Reveal

Sections appear smoothly as the user scrolls.

### 🔢 Animated Counters

Statistics animate into view.

### 🍔 Mobile Navigation

Responsive navigation menu for smaller screens.

### 🔔 Toast Notifications

User-friendly feedback for actions such as cart and wishlist updates.

### 🎨 Theme Transition

Smooth switching between light and dark themes.

---

# 🗂️ Project Structure

```text
fusion/
│
├── 🏠 index.html
├── 🍱 products.html
├── 🍽️ singlepage.html
├── 🏷️ categories.html
├── 🧬 nutrition.html
├── 🛒 cart.html
├── 📦 subscription.html
├── 📖 about.html
├── 🔐 login.html
├── 📝 signup.html
│
├── ⚡ app.js
├── 🎨 style.css
│
└── 📁 images/
    │
    ├── icons/
    │   └── sprite.svg
    │
    ├── fusionassets/
    │   └── Meal photos
    │
    ├── featurescategory/
    │   └── Category images
    │
    └── *.png
        └── Page banners
```

---

# 🎨 CSS Architecture

Although the project uses a single `style.css` file, the stylesheet is logically organized into five major sections.

| Section            | Responsibility                                               |
| ------------------ | ------------------------------------------------------------ |
| `variables.css`    | Colors, spacing, typography, shadows, radii, theme variables |
| `style.css (base)` | Reset, typography and layout utilities                       |
| `components.css`   | Navbar, cards, buttons, forms, cart, tabs and footer         |
| `animations.css`   | Fade, zoom, float, flip and reveal animations                |
| `responsive.css`   | Tablet and mobile breakpoints                                |

### 🎨 Design System

The CSS architecture focuses on:

```text
Design Tokens
     ↓
Base Styles
     ↓
Components
     ↓
Animations
     ↓
Responsive Rules
```

---

# ⚡ JavaScript Architecture

FUSION uses **one JavaScript file** loaded with `defer`.

Instead of creating separate JavaScript files for every page, `app.js` checks whether the required elements exist before executing page-specific functionality.

---

## 🧩 JavaScript Modules

### ⚙️ Configuration

```text
API
COUPONS
DELIVERY_FEE
FREE_DELIVERY_ABOVE
```

### 🛠️ Helpers

```text
$
$$
getParam
money
icon
toast
getJSON
```

### 💾 Storage

```text
getSaved()
save()
```

### 🛒 Cart & Wishlist

```text
addToCart()
changeQty()
removeFromCart()
cartTotals()
toggleWishlist()
```

### 🔎 Filtering

```text
filterProducts()
sortProducts()
setupToolbar()
```

### 🧱 Templates

```text
productCard()
flipCard()
categoryCard()
nutritionCard()
cartItem()
macroBar()
```

### 📄 Page Renderers

```text
homePage()
productsPage()
categoriesPage()
nutritionPage()
singlePage()
cartPage()
profilePage()
```

### 🎨 UI

```text
setupTheme()
setupNavbar()
setupReveal()
setupCounters()
setupBlogFilter()
```

### 🖱️ Events

```text
setupClicks()
```

A delegated event listener handles buttons using:

```text
data-action="..."
```

---

# 🔌 API Integration

FUSION loads meal and category information from a remote REST API.

```javascript
const API = "https://fusion-api-mu.vercel.app/api";
```

### Available Endpoints

| Method | Endpoint      | Used For                                       |
| ------ | ------------- | ---------------------------------------------- |
| `GET`  | `/products`   | Meals, Home, Nutrition, Details, Cart, Profile |
| `GET`  | `/categories` | Categories                                     |

---

# 📦 Product Data

The UI uses the following product fields:

```text
id
name
category
categorySlug
description
price
oldPrice
rating
ratingCount
deliveryTime
calories
protein
carbs
fat
fiber
sugar
badges
special
image1
image2
icon
gradient
ingredients
preparation
benefits
servingSize
allergens
```

---

# 🏷️ Category Data

Category objects contain:

```text
name
slug
desc
icon
gradient
isPlan
```

---

# 💾 Browser Storage

FUSION uses `localStorage` to preserve important user preferences.

| Storage Key          | Purpose                            |
| -------------------- | ---------------------------------- |
| `fusion_cart_v1`     | Stores cart items and quantities   |
| `fusion_wishlist_v1` | Stores favourite product IDs       |
| `fusion_theme`       | Stores light/dark theme preference |

### Example Cart Data

```javascript
[
  {
    id: 101,
    qty: 2
  }
]
```

---

# 🎟️ Coupon System

FUSION includes a client-side coupon system.

| Coupon      | Discount |
| ----------- | -------: |
| `WELCOME50` |  50% OFF |
| `FUSION20`  |  20% OFF |
| `HEALTHY10` |  10% OFF |

Coupons are:

* ✅ Client-side validated
* ✅ Case-insensitive
* ✅ Applied automatically to totals

---

# 🚚 Delivery Rules

| Rule             |           Value |
| ---------------- | --------------: |
| 🚚 Delivery Fee  |             ₹40 |
| 🎁 Free Delivery | Subtotal ≥ ₹999 |

### Example

```text
Subtotal < ₹999
        ↓
     ₹40 Delivery

Subtotal ≥ ₹999
        ↓
   FREE DELIVERY 🎉
```

---

# 🔗 URL Parameters

FUSION supports dynamic URL parameters.

### Filter by Category

```text
products.html?category=<slug>
```

Example:

```text
products.html?category=healthy-salads
```

### Search

```text
products.html?q=<text>
```

### Single Meal

```text
singlepage.html?id=<product-id>
```

---

# 🚀 Application Flow

```text
                 🌐 HOME
                   │
          ┌────────┼────────┐
          │        │        │
          ▼        ▼        ▼
       🍱 Meals  🧬 Nutrition  🏷️ Categories
          │        │        │
          └────────┼────────┘
                   │
                   ▼
              🍽️ Meal Details
                   │
             ┌─────┴─────┐
             │           │
             ▼           ▼
          ❤️ Wishlist   🛒 Cart
                         │
                    🎟️ Coupon
                         │
                    💰 Totals
                         │
                    🚚 Delivery
                         │
                         ▼
                    ✅ Checkout
```

---

# 🌐 Complete Page Map

```text
FUSION
│
├── 🏠 Home
│
├── 🍱 Products
│   └── 🍽️ Single Meal
│
├── 🏷️ Categories
│
├── 🧬 Nutrition Explorer
│
├── 🛒 Cart
│
├── 📦 Subscription
│
├── 📖 About
│   └── 📝 Journal
│
├── 🔐 Login
│
└── 📝 Sign Up
```

---

# 🛠️ Tech Stack

<p align="center">

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">

<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<img src="https://img.shields.io/badge/REST%20API-Integration-009688?style=for-the-badge">

<img src="https://img.shields.io/badge/localStorage-Browser%20Storage-FF9800?style=for-the-badge">

<img src="https://img.shields.io/badge/IntersectionObserver-Animations-673AB7?style=for-the-badge">

<img src="https://img.shields.io/badge/SVG-Sprite-FF5722?style=for-the-badge">

</p>

### No Frameworks. No Build Step.

```text
HTML5
  +
CSS3
  +
Vanilla JavaScript
  +
REST API
  +
localStorage
  =
🥗 FUSION
```

---

# ⚙️ Getting Started

FUSION does not require a package installation or build process.

## 1️⃣ Clone or Download

Download the repository or clone it using Git.

```bash
git clone <your-repository-url>
```

## 2️⃣ Open the Project

```bash
cd fusion
```

## 3️⃣ Start a Local Server

### Python

```bash
python -m http.server 5500
```

### Node.js

```bash
npx serve .
```

## 4️⃣ Open in Browser

```text
http://localhost:5500
```

> 💡 A local server is recommended because the application uses `fetch()` and relative asset paths.

---

# 🌐 Internet Requirement

FUSION depends on its remote REST API for meal and category information.

```text
Browser
   │
   ▼
FUSION Frontend
   │
   ▼
REST API
   │
   ▼
Meal / Category Data
```

If the API cannot be reached, the product grids display:

> **Couldn't load data from the FUSION API**

---

# ⚠️ Demo Limitations

FUSION is currently a **frontend-focused project**.

The following features are demonstrations:

* 🔐 Login
* 📝 Sign Up
* 📧 Newsletter
* 📦 Subscription selection
* 💳 Checkout
* 🔑 Authentication
* 💰 Payments
* 📋 Orders

### Important

There is currently:

* ❌ No real authentication
* ❌ No payment gateway
* ❌ No real order processing
* ❌ No backend checkout
* ❌ No Google authentication

The checkout demo simply clears the cart and returns to the home page.

---

# 🔮 Future Improvements

FUSION can be expanded into a complete full-stack food platform.

### 🔐 Authentication

* User registration
* Secure login
* JWT authentication
* User profiles

### 💳 Payments

* Payment gateway
* Order confirmation
* Payment history

### 📦 Orders

* Order tracking
* Order history
* Delivery status

### 🧑‍🍳 Admin Dashboard

* Add meals
* Update prices
* Manage categories
* Manage orders
* Manage users

### 🤖 Smart Features

* Personalized meal recommendations
* Calorie-based meal suggestions
* AI nutrition assistant
* Smart meal planning

### 📱 Mobile

* Progressive Web App
* Push notifications
* Mobile-first ordering experience

---

# 🧠 What This Project Demonstrates

FUSION demonstrates practical frontend development skills including:

* Semantic HTML5
* Modern CSS3
* CSS Grid
* Flexbox
* CSS custom properties
* Responsive design
* Vanilla JavaScript
* ES6+
* DOM manipulation
* Event delegation
* REST API integration
* Async JavaScript
* `fetch()`
* `localStorage`
* URL parameters
* Dynamic rendering
* Search and filtering
* Sorting
* Shopping cart logic
* Wishlist logic
* Theme persistence
* IntersectionObserver
* SVG sprite icons
* Accessibility
* UI animations

---

# 🏆 Project Highlights

```text
┌──────────────────────────────────────┐
│           🥗 FUSION                   │
├──────────────────────────────────────┤
│                                      │
│  🍱 Dynamic Meal Catalogue            │
│  🧬 Nutrition Explorer               │
│  🛒 Shopping Cart                    │
│  ❤️ Wishlist                         │
│  🎟️ Coupon System                    │
│  📦 Subscription Plans               │
│  🌙 Theme Switching                  │
│  🔌 REST API                         │
│  💾 localStorage                     │
│  ♿ Accessibility                     │
│  📱 Responsive UI                    │
│                                      │
└──────────────────────────────────────┘
```

---

# 👩‍💻 Author

## Bhanusri Manukonda

🎓 **B.Tech CSE**
🏫 **Aditya College of Engineering and Technology**

FUSION was developed as a practical frontend project focused on building a complete, interactive and responsive healthy-food ordering experience using core web technologies.

---

# 🌱 FUSION Philosophy

<p align="center">

### 🥗 Eat Better

### 💪 Live Better

### ❤️ Feel Better

### 🌱 Grow Better

</p>

---

# ⭐ Support

If you like the FUSION project:

⭐ **Star the repository**

🍴 **Fork the project**

💡 **Share your feedback**

🤝 **Contribute ideas**

---

# 📄 License

© 2026 **FUSION**. All rights reserved.

This project is created for educational, demonstration and portfolio purposes.

---

<p align="center">

## 🥗 FUSION

### <i>Healthy choices. Better lifestyle.</i>

<br>

**Built with ❤️ using HTML • CSS • JavaScript**

<br>

🌱 **Eat Healthy. Live Healthy.**

</p>
```
