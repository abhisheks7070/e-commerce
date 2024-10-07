# MERN E-Commerce Website

This is a full-stack e-commerce web application built using the **MERN** stack (MongoDB, Express, React, and Node.js) with **JWT authentication** for secure login and **Redux** for state management. The app allows users to browse products, add them to their cart, make purchases, and leave reviews. Administrators can manage products and orders.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [File Structure](#file-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register, login, and manage user sessions with JWT-based authentication.
- **Product Browsing**: View a list of products, search, and filter by category.
- **Cart System**: Add and manage products in the cart and proceed to checkout.
- **Order Management**: Place orders and track their status (for users).
- **Admin Dashboard**: Admins can add, edit, and delete products, and manage user orders.
- **Product Reviews**: Users can leave reviews and ratings on products.
- **Redux for State Management**: Manage global state using Redux (e.g., cart, wishlist, authentication).
- **Responsive Design**: Built with Tailwind CSS for a mobile-first and responsive design.

## Tech Stack

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Redux**: For managing application state.
- **Tailwind CSS**: For styling the frontend.
- **JWT (JSON Web Tokens)**: For secure authentication.

### Backend:
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Node.js framework for building the backend API.
- **MongoDB**: NoSQL database for storing products, users, orders, and reviews.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Installation

### Prerequisites:
- Node.js (v14 or above)
- MongoDB (local or MongoDB Atlas)
- Git

### Steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/mern-ecommerce.git
    cd mern-ecommerce
    ```

2. Install dependencies for both the frontend and backend:
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. Setup MongoDB:
   - If you're using a local MongoDB instance, ensure it's running.
   - If you're using MongoDB Atlas, create a new cluster and get the connection string.

4. Configure environment variables (see [Environment Variables](#environment-variables)).

5. Start the application:

    - In two separate terminals, run the backend and frontend servers:
      ```bash
      # Start backend (runs on port 5000 by default)
      cd backend
      npm run dev

      # Start frontend (runs on port 3000 by default)
      cd ../frontend
      npm start
      ```

6. Visit `http://localhost:3000` in your browser to access the app.

## Usage

### Frontend (React)
- The frontend is built using React and styled with Tailwind CSS.
- Users can browse products, add them to the cart, and place orders.
- Redux manages global state for cart, wishlist, and authentication.
  
### Backend (Node.js, Express, MongoDB)
- The backend is an Express server that handles API requests (product browsing, user authentication, orders).
- MongoDB is used to store product, user, order, and review data.
- JWT is used for authentication and authorization.

### User Roles:
- **Regular Users** can browse products, add them to the cart, leave reviews, and place orders.
- **Admins** have access to the admin dashboard to manage products and orders.

## Environment Variables

You will need to configure the following environment variables for the app to function properly. These variables should be placed in `.env` files in both the `backend` and `frontend` directories.

### Backend (`backend/.env`):
```bash
PORT=5000
MONGO_URI=<Your MongoDB URI>
<<<<<<< HEAD
JWT_SECRET=<Your JWT secret>
=======
JWT_SECRET=<Your JWT secret>
>>>>>>> fec2fa4fe49cc010738b9c4238d9c8f66622d12b
