# CapStore - E-Commerce Platform

CapStore is a full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to browse products, add items to their cart, and proceed to checkout. It includes features such as user authentication, product filtering, and a fully functional shopping cart.

## Features

- **User Authentication:** Secure login and registration for users.
- **Product Listing:** Display products with search, filter, and sort options.
- **Shopping Cart:** Add, edit, and remove items from the cart.
- **Checkout:** Enter shipping details and complete the purchase.

## Technologies Used

- **Frontend:**

  - React
  - TypeScript
  - Tailwind CSS
  - DaisyUI
  - Redux Toolkit for state management
  - React Router for routing
  - Axios for HTTP requests

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Bcrypt for password hashing

## Live Sites

- Frontend Live Site: [Capstore E-Commerce Frontend](https://capstore-mern-ecommerce.vercel.app/)

- Backend Live API: [Capstore E-Commerce Backend API](https://mern-ecommerce-676s.onrender.com/api)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/nadirkerem/capstore-ecommerce-mern.git
cd capstore-ecommerce-mern
```

2. **Install the dependencies:**

```bash
npm install
```

This command will install the dependencies for both the client and server using the concurrently package.

3. **Environment Variables**

For convenience, example environment variable files have been provided. Copy the example files to create your actual environment variable files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Then, edit the .env files with your own configuration.

### Usage

#### Development

To run both the client and server concurrently in development mode, use:

```bash
npm start
```

This command will start both the frontend (React) and backend (Node.js/Express) servers concurrently.

#### Production

For production builds, you should handle the build process for the frontend and serve the static files from the backend. This can involve additional steps such as setting up a reverse proxy using Nginx or hosting on platforms like Heroku or Vercel.

### License

This project is licensed under the MIT License.
