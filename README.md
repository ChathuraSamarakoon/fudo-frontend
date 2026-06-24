# 🍔 Fudo Frontend

A modern, responsive food ordering web application built with **React** and **Tailwind CSS**. Fudo allows customers to browse menus, manage their cart, place orders, and track order history — while admins can manage products, orders, users, and messages through a dedicated dashboard.

> 🎓 Built as part of a personal project to demonstrate frontend development skills using React and modern web technologies.

---

## 🚀 Tech Stack

| Technology | Details |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM 7 |
| **HTTP Client** | Axios |
| **Icons** | React Icons |

---

## ✨ Features

### Customer
- 🏠 **Home Page** — Hero section with delivery address input and social proof
- 🍕 **Menu Page** — Browse and filter products by category (Burgers, Pizza, Rice, Kottu, Beverages, Desserts, Combos)
- 🛒 **Cart & Checkout** — Add items, adjust quantities, and place orders
- 📦 **Order History** — View past orders and their status
- 📬 **Contact Page** — Send messages to the admin team
- ℹ️ **About Page** — Learn more about Fudo
- 🔐 **Auth** — Register and login with role-based access control

### Admin
- 📊 **Admin Dashboard** with tabbed navigation:
  - **Orders** — View all orders and update order status in real-time
  - **Products** — Add, edit, and delete menu items
  - **Messages** — View and manage customer contact messages
  - **Users** — View and manage registered users

---

## 📁 Project Structure

```
fudo-frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/               # Static images
│   ├── components/
│   │   ├── Navbar.jsx        # Top navigation bar with cart icon
│   │   ├── Footer.jsx        # Site footer
│   │   ├── ProtectedRoute.jsx  # Auth guard for admin routes
│   │   └── OrderDetailsModal.jsx
│   ├── context/
│   │   └── CartContext.jsx   # Global cart state management
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/             # API communication layer
│   │   ├── api.js            # Axios base instance
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   ├── userService.js
│   │   └── messageService.js
│   ├── App.jsx               # Root component with route definitions
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fudo-frontend.git
cd fudo-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the API Base URL

Update `src/services/api.js` to point to your backend:

```js
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});
```

> The backend for this project is available at: [fudo-backend](https://github.com/your-username/fudo-backend)

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🗺️ Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/menu` | Menu | Public |
| `/about` | About | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/cart` | Checkout | Public |
| `/orders` | Order History | Public |
| `/admin` | Admin Dashboard | Admin only |

---

## 🔐 Authentication & Authorization

- User session is stored in **localStorage** after login.
- The `ProtectedRoute` component guards the `/admin` route — redirects non-admin users to the home page.
- Role-based access is determined by the `role` field (`CUSTOMER` or `ADMIN`) returned from the backend.

---

## 🛒 Cart Management

Cart state is managed globally using **React Context API** (`CartContext`):

- Persisted to `localStorage` so the cart survives page refreshes
- Supports: add item, update quantity, remove item, clear cart
- Cart item count is shown in the Navbar

---

## 🌐 API Integration

All API calls are handled through a centralized service layer under `src/services/`:

| Service | Responsibilities |
|---|---|
| `productService.js` | Get all/by category, add, update, delete products |
| `orderService.js` | Place order, get by user/all, update status |
| `userService.js` | Get all users, delete user |
| `messageService.js` | Send, get all, mark as read, delete messages |

---

## 🔮 Future Improvements

- [ ] JWT token-based authentication
- [ ] Real-time order tracking with WebSockets
- [ ] Payment gateway integration
- [ ] Product search functionality
- [ ] Customer reviews and ratings
- [ ] Mobile app version with React Native

---

## 🔗 Related Repository

- **Backend API:** [fudo-backend](https://github.com/ChathuraSamarakoon/fudo-backend) — Spring Boot REST API

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
