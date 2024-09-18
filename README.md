# E-commerce Backend API with NestJS

Welcome to the E-commerce Backend API built with [NestJS](https://nestjs.com/) and TypeScript. This API manages user roles, menus, and products in an e-commerce platform.

![NestJS Logo](https://nestjs.com/img/logo_text.svg)

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Running the Tests](#running-the-tests)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- User authentication and role management
- Dynamic menu visibility based on user roles
- Product management (CRUD operations)
- Secure API with JWT authentication
- Role-based access control
- MongoDB integration for data storage

## Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** MongoDB (using [Mongoose](https://mongoosejs.com/))
- **Authentication:** JWT (JSON Web Tokens)
- **Authorization:** Role-based access control
- **Environment Variables Management:** Dotenv
- **Testing Framework:** Jest

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/ecommerce-nestjs-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ecommerce-nestjs-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory of your project, and add the following variables:

```bash
# Server
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Secret
JWT_SECRET=your_jwt_secret

# Other environment variables...

    ## Usage
Start the development server:

API Endpoints
Here’s a quick overview of the API endpoints.

Authentication

POST /auth/login: Authenticate a user and receive a JWT.
POST /auth/register: Register a new user.
Roles

GET /roles: Retrieve all roles.
POST /roles: Create a new role.
Menus

GET /menus: Retrieve menus based on user roles.
POST /menus: Add a new menu (restricted to admins).
Products

GET /products: Retrieve all products.
POST /products: Add a new product (restricted to admins).
PUT /products/:id: Update a product (restricted to admins).


Contributing
Gonza And Lauta

