# 🛍️ MyShop — Frontend

A modern, responsive e-commerce web application built with **Angular**. Browse products across multiple categories, manage your cart and wishlist, and place orders — all with a clean and intuitive UI.

---

## 🖥️ Live Preview

> Run locally at `http://localhost:4200`

![MyShop Screenshot](https://github.com/Naveenkumar-Pavuluri/MyShop-Frontend/blob/main/public/assets/home-page.png)

---

## ✨ Features

- 🔐 **Authentication** — Login / Logout with session-based user display
- 🔍 **Search** — Search bar in the navbar for quick product lookup
- 🛒 **Shopping Cart** — Add, remove, and manage cart items
- ❤️ **Wishlist** — Save products for later
- 📦 **Orders** — View your past and current orders
- 🗂️ **Category Navigation** — Browse by Mobiles, Electronics, Home & Furniture, Fashion, Grocery, Books
- 🎠 **Product Carousel** — Featured products slider on the homepage
- 🆕 **New Products Section** — Highlighted latest arrivals with images and descriptions

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| Angular | Frontend framework |
| TypeScript | Language |
| HTML5 / CSS3 | Markup & styling |
| Angular Router | Client-side routing |
| HttpClient | API communication with backend |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Angular CLI

```bash
npm install -g @angular/cli
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/myshop-frontend.git
cd myshop-frontend

# Install dependencies
npm install

# Start the development server
ng serve
```

The app will be available at `http://localhost:4200`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components (navbar, product card, carousel)
│   ├── pages/            # Route-level pages (home, product, cart, orders)
│   ├── services/         # API services (auth, products, cart, orders)
│   ├── models/           # TypeScript interfaces/models
│   └── app-routing.module.ts
├── assets/               # Static assets
└── environments/         # Environment config (API base URL etc.)
```

---

## 🔗 Backend

This frontend connects to the **MyShop Backend** REST API.
Make sure the backend server is running before starting the frontend.

👉 [MyShop Backend Repository](https://github.com/your-username/myshop-backend)

Default API base URL: `http://localhost:3000` (configurable in `src/environments/environment.ts`)

---

## 📸 Screenshots

| Homepage | Product Carousel |
|----------|-----------------|
| ![home](https://github.com/Naveenkumar-Pavuluri/MyShop-Frontend/blob/main/public/assets/home-page.png) | ![carousel](https://github.com/Naveenkumar-Pavuluri/MyShop-Frontend/blob/main/public/assets/carousel.png) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---
