# E-Tech E-Commerce Store

[![Angular](https://img.shields.io/badge/Angular-v19+-DD0031?style=flat&logo=angular)](https://angular.io/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat&logo=link)](https://etech-store123.com)

A professional, feature-rich e-commerce store application built with Angular 19. This project was developed as a technical assessment for **E-Tech**.

---

## 🚀 Live Demo
Experience the application live at: **[https://etech-store123.com](https://etech-store123.com)**

---

## 📋 Project Objective
Develop a basic yet impressive e-commerce web application focusing on:
- Role-based access control (User & Admin).
- Dynamic localization (English & Arabic).
- Efficient data handling (Pagination, Debouncing, Caching).
- Modern UI/UX using SASS and the latest Angular features.

---

## 🔐 Authentication & Roles
The application supports two primary roles. Unauthorized access to role-specific views is strictly restricted.

| Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin` | Full Product Management (CRUD), Pagination |
| **User** | `user` | `user` | Browsing, Categories, Filters, Product Details |

> [!NOTE]
> The login form is only accessible to unauthenticated visitors.

---

## ✨ Features

### 🛍️ Categories & Product Display
- **Admin View**:
    - Manage product catalog via a comprehensive table.
    - Full CRUD operations: **Add, Update, Delete** products.
    - Integrated **Pagination** for large datasets.
- **User View**:
    - Browse products by category.
    - Advanced **Filters** section for easy navigation.
    - Detail view for each product.
    - **Reactive UI**: Leveraging **Angular Signals** for granular reactivity and performance.
    - Smooth **Loading Animations** during data fetching.

### 🛒 Bonus Feature: Shopping Cart & Wishlist
- **State Management**: fully responsive cart using *Angular Signals* (`CartService`).
- **Interactive Cart UI**: Adjust item quantities, remove items, or move them to a simulated wishlist.
- **Fake Checkout Flow**: Real-time order summary calculation and a mock checkout action.
- **Integrated UX**: "Add to Cart" functions on products alongside a live badge indicator in the Navigation Menu.

### 🌍 Localization
- Supports **English** and **Arabic** out-of-the-box using **ngx-translate**.
- Dynamic RTL (Right-to-Left) support for Arabic.
- Real-time language switching without page reload.

### 🎨 Modern UI/UX
- Styled with **Tailwind CSS** for a modern, utility-first design approach.
- Responsive and mobile-friendly layouts, including a reactive Navbar with a User Profile dropdown (Cart, Language Switcher, Logout).
- Custom SASS for complex component-specific styles.

### 🛠️ Technical Excellence
- **API Integration**: Real-time data consumption from [FakeStoreAPI](https://fakestoreapi.com).
- **Performance**:
    - Search **Debounce** to reduce unnecessary API calls.
    - Optimized memory usage for large datasets.
    - SASS-based styling for maintainable and scalable CSS.

---

## 💻 Tech Stack
- **Framework**: Angular 19
- **Styling**: SASS (SCSS), Tailwind CSS
- **Localization**: `@ngx-translate/core`
- **API**: [FakeStoreAPI](https://fakestoreapi.com)

---

## 🛠️ Setup & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.dev/tools/cli)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/etech-ecommerce-store.git
   cd etech-ecommerce-store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running with CLI
To start the local development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Production Build
```bash
ng build
```

---

## 🧪 Evaluation Criteria met
- ✅ **Clean Code**: Proper separation of concerns and readable architecture.
- ✅ **Mobile-First**: Fully responsive UI/UX design.
- ✅ **Efficiency**: Implemented caching and debouncing.
- ✅ **Localization**: Dynamic i18n support for bi-directional layouts.
