# BuyIt E-Commerce Platform

BuyIt is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform. It provides a robust backend REST API and a modern React frontend for users and administrators to manage products, categories, orders, and more.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Overview](#api-overview)
- [License](#license)

---

## Features

### User Features
- User registration, login, and password reset
- Browse products by category, price, and search
- Product details and related products
- Shopping cart and checkout (Braintree payment integration)
- View and manage orders
- Update user profile and address

### Admin Features
- Admin dashboard
- Create, update, and delete products
- Create, update, and delete categories
- View and manage all orders
- View all users

### General
- Responsive UI with Ant Design and custom styles
- RESTful API with JWT authentication
- MongoDB for data storage
- Error handling and notifications

---

## Tech Stack
- **Frontend:** React, React Router, Ant Design, Axios, React Context API
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Braintree
- **Other:** Nodemon, Morgan, dotenv, concurrently

---

## Project Structure

```
e-commerce/
  ├── client/           # React frontend
  │   ├── src/
  │   └── public/
  ├── controllers/      # Express controllers
  ├── helpers/          # Helper functions
  ├── middlewares/      # Express middlewares
  ├── models/           # Mongoose models
  ├── routes/           # Express routes
  ├── config/           # DB config
  ├── server.js         # Express entry point
  └── package.json      # Backend dependencies
```

---

## Getting Started

### Backend Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Create a `.env` file** in the root with the following variables:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
   BRAINTREE_PUBLIC_KEY=your_braintree_public_key
   BRAINTREE_PRIVATE_KEY=your_braintree_private_key
   DEV_MODE=development
   PORT=8080
   ```
3. **Start the backend server:**
   ```bash
   npm run server
   ```

### Frontend Setup
1. **Navigate to the client folder:**
   ```bash
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the React app:**
   ```bash
   npm start
   ```
   The app will run on [http://localhost:3000](http://localhost:3000)

### Run Both (Dev Mode)
From the root directory:
```bash
npm run dev
```
This will start both backend and frontend concurrently.

---

## Environment Variables
- `MONGO_URL`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT authentication
- `BRAINTREE_MERCHANT_ID`, `BRAINTREE_PUBLIC_KEY`, `BRAINTREE_PRIVATE_KEY`: Braintree payment credentials
- `DEV_MODE`: Set to `development` for local dev
- `PORT`: Port for backend server (default: 8080)

---

## Scripts
- `npm run server` — Start backend with nodemon
- `npm run client` — Start frontend React app
- `npm run dev` — Start both backend and frontend concurrently

---

## API Overview

### Auth
- `POST /api/v1/auth/register` — Register user
- `POST /api/v1/auth/login` — Login user
- `POST /api/v1/auth/resetpassword` — Reset password
- `PUT /api/v1/auth/profile` — Update profile
- `GET /api/v1/auth/orders` — Get user orders
- `GET /api/v1/auth/all-orders` — Get all orders (admin)
- `PUT /api/v1/auth/order-status/:oid` — Update order status (admin)

### Category
- `POST /api/v1/category/create-category` — Create category (admin)
- `PUT /api/v1/category/update-category/:id` — Update category (admin)
- `GET /api/v1/category/get-category` — Get all categories
- `GET /api/v1/category/single-category/:slug` — Get single category
- `DELETE /api/v1/category/delete-category/:id` — Delete category (admin)

### Product
- `POST /api/v1/product/create-product` — Create product (admin)
- `PUT /api/v1/product/update-product/:pid` — Update product (admin)
- `GET /api/v1/product/get-product` — Get all products
- `GET /api/v1/product/get-product/:slug` — Get single product
- `GET /api/v1/product/product-photo/:pid` — Get product photo
- `DELETE /api/v1/product/product-delete/:pid` — Delete product (admin)
- `POST /api/v1/product/product-filters` — Filter products
- `GET /api/v1/product/product-count` — Get product count
- `GET /api/v1/product/product-list/:page` — Get paginated products
- `GET /api/v1/product/search/:keyword` — Search products
- `GET /api/v1/product/related-product/:pid/:cid` — Get related products
- `GET /api/v1/product/product-category/:slug` — Get products by category
- `GET /api/v1/product/braintree/token` — Get Braintree token
- `POST /api/v1/product/braintree/payment` — Make payment

---

## License

MIT
