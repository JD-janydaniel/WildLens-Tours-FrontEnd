# WildLens Tours Documentation

## Table Of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Installation and Setup](#installation-and-setup)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [User Roles and Permissions](#user-roles-and-permissions)
9. [User Flow](#user-flow)
10. [Usage](#usage)
11. [Security Considerations](#security-considerations)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)
14. [Future Enhancements](#future-enhancements)
15. [Conclusion](#conclusion)

## Introduction

The WildLens Tours platform aims to connect wildlife enthusiasts with nature by providing a robust and user-friendly booking system for wildlife tours. The application offers essential features like search and filtering, tour bookings, and user reviews, with a strong focus on security and scalability.

### Objective

The main goal is to streamline the process of discovering and booking wildlife tours, ensuring both tourists and tour guides have a seamless experience. From a technical standpoint, the project focuses on creating a maintainable codebase, leveraging modern frameworks and practices.

## Project Overview

WildLens Tours serves three primary user types:

- **Tourists:** Individuals looking for wildlife tours, booking them, and reviewing their experiences.
- **Admins:** Users with elevated permissions to oversee platform activity, manage users, tours, and handle content moderation.

The application is built using the MERN stack, providing a dynamic and responsive front-end experience with React, while ensuring scalability and reliability with a Node.js and MongoDB backend.

## Features

### Core Features

1. **User Registration and Authentication:**
   - **Registration:** Users can sign up using their email and password or through Google OAuth, which simplifies the process by allowing users to sign in using their Google accounts, leveraging Firebase Authentication.
   - **Password Reset:** If users forget their password, they can request a password reset link via email, ensuring they can regain access to their account securely.
2. **Tour Browsing and Filtering:**
   - **Search Functionality:** Users can search for tours by various criteria, such as location, price range, and tour duration, allowing them to quickly find the most relevant tours.
3. **Tour Booking System:**
   - **Booking Process:** Once users find a suitable tour, they can book it directly on the platform. The system handles all aspects of the booking, including date selection.
   - **Booking History:** Users can view their past bookings, providing them with a record of their tours and an easy way to reference them in the future.
4. **Reviews and Ratings:**
   - **Ratings System:** After completing a tour, users can rate it on a 5-star scale. These ratings are crucial for other users to assess the quality of the tours.
   - **Review Comments:** In addition to ratings, users can leave detailed reviews, which are displayed alongside the ratings, providing more context to potential customers.

### Admin Features

1. **Tour Management:**
   - **CRUD Operations:** Admins have full control over tours, allowing them to create, update, or delete tours. They can manage tour details, dates, pricing, and availability, ensuring the platform’s content remains current.
   - **Guide Management:** Admins can manage tour guides, assign permissions, and ensure guides adhere to platform standards.
2. **User Management:**
   - **User Moderation:** Admins can monitor user activity, handle complaints, and take action if users violate platform policies. They can also delete or suspend accounts if necessary.
3. **Review Management:** Admins have the authority to moderate user reviews. If a review contains inappropriate content or violates platform guidelines, admins can remove it to maintain the platform's integrity.

## Security Features

1. **JWT Authentication:** Authentication is managed using JSON Web Tokens (JWT), ensuring that users’ sessions are secure and tamper-proof. JWTs allow users to stay logged in without storing sensitive data on the client side.
2. **Role-Based Access Control (RBAC):** Different users have different permissions based on their roles (User, Tour Guide, Admin). RBAC ensures that only authorized users can perform specific actions, such as creating or deleting tours.

## Tech Stack

### Frontend

1. **React:** A powerful JavaScript library for building user interfaces. React’s component-based architecture helps in creating reusable UI components, making the application more maintainable and scalable.
2. **Redux Toolkit:** Manages the global state of the application, ensuring that different parts of the application can access and modify the state consistently. Redux Toolkit simplifies state management with built-in tools like slices and middleware.
3. **Bootstrap:** A popular CSS framework for responsive web design. It provides pre-built UI components and grid systems, enabling rapid development and ensuring the application looks good on various devices.
4. **React Toastify:** Used for displaying notifications and alerts within the application. This enhances user experience by providing non-intrusive, real-time feedback.

### Backend

1. **Node.js:** A JavaScript runtime built on Chrome’s V8 engine. Node.js is designed for building scalable network applications, making it ideal for the backend of WildLens Tours.
2. **Express:** A minimal and flexible Node.js web application framework. Express handles routing, middleware, and serves as the backbone of the backend architecture.
3. **MongoDB:** A NoSQL database that stores data in flexible, JSON-like documents. MongoDB is chosen for its scalability, performance, and ability to handle large amounts of unstructured data.
4. **Mongoose:** An object data modeling (ODM) library for MongoDB and Node.js. Mongoose provides a schema-based solution to model your application data, making it easier to work with MongoDB.

### Third-Party Services

1. **Firebase:** Used for authentication and Google OAuth integration. Firebase simplifies user management, allowing users to sign in using their Google accounts securely.
2. **Netlify:** A platform for deploying and hosting static sites. WildLens Tours’ frontend is deployed on Netlify, ensuring fast load times and easy integration with GitHub.
3. **Render:** A cloud platform for hosting backend services. The backend of WildLens Tours is deployed on Render, providing a scalable and reliable environment.

## Installation and Setup

### Frontend Setup

1. **Clone the Repository:** The first step is to clone the frontend repository from GitHub. This ensures that you have a local copy of the project to work with.
2. **Install Dependencies:** After cloning, you need to install all the necessary dependencies using `npm install`. This command reads the `package.json` file and installs the required packages.
3. **Set Environment Variables:** Environment variables are essential for connecting the frontend to backend services like Firebase and Stripe. You’ll need to set these variables in a `.env` file to keep sensitive information out of the codebase.
4. **Start the Frontend Server:** Use `npm run dev` to start the development server. This command will compile the React application and serve it on a local server, usually at `http://localhost:3000`.

### Backend Setup

1. **Clone the Repository:** Similar to the frontend, you’ll need to clone the backend repository from GitHub.
2. **Install Dependencies:** Run `npm install` to install all backend dependencies, such as Express, Mongoose, and other Node.js packages.
3. **Set Environment Variables:** The backend requires environment variables for connecting to MongoDB, handling JWT tokens, and processing payments with Stripe. These variables should be stored in a `.env` file.
4. **Start the Backend Server:** Use `npm run dev` to start the backend server in development mode. This will run the server with hot reloading, making it easier to test and debug during development.

## Environment Variables

Environment variables are crucial for configuring the application in different environments (development, staging, production). They keep sensitive data like API keys and database connection strings out of the codebase.

### Frontend Variables

- **VITE_FIREBASE_API_KEY:** The API key for connecting to Firebase, which handles authentication and OAuth.

### Backend Variables

- **MONGODB_URL:** The connection string for MongoDB. This is essential for connecting the backend to the MongoDB database.
- **JWT_SECRET_KEY:** The secret key used for signing JWT tokens. This key should be kept secure, as it is used to verify user sessions.


## API Endpoints

### Authentication Endpoints

- **Register User**  
  `POST /api/auth/register-user`  
  Register a new user or admin.

- **Login User**  
  `POST /api/auth/login-user`  
  Log in a user or admin.

- **Google OAuth**  
  `POST /api/auth/google-auth`  
  Register and log in using Google OAuth.

- **Forgot Password**  
  `POST /api/auth/forgot-password`  
  Send a password reset link to the registered email.

- **Reset Password**  
  `POST /api/auth/reset-password/:id/:token`  
  Reset password using the provided token.

### User Management Endpoints

- **Update User**  
  `PUT /api/user/update-user/:id`  
  Update user profile and profile picture.

- **Delete User**  
  `DELETE /api/user/delete-user/:id`  
  Delete a user account.

### Tour Endpoints

- **Create Tour**  
  `POST /api/tour/create-tours`  
  Admin-only endpoint for creating tour packages.

- **Get All Tours**  
  `GET /api/tour/getAllTours`  
  Retrieve and display all tours on the landing page.

- **Get Tour By ID**  
  `GET /api/tour/getToursById/:id`  
  Fetch a specific tour by its ID.

- **Update Tour**  
  `PUT /api/tour/update-tours/:id`  
  Admin-only endpoint for updating tours.

- **Delete Tour**  
  `DELETE /api/tour/delete-tours/:id`  
  Admin-only endpoint for deleting tours.

### Tour Guide Endpoints

- **Create Tour Guide**  
  `POST /api/guide/create-tour-guide`  
  Admin-only endpoint for creating tour guides.

- **Get All Tour Guides**  
  `GET /api/guide/getAllTourGuides`  
  Retrieve and display all tour guides.

### Booking Endpoints

- **Create Booking**  
  `POST /api/booking/create-booking`  
  Book a tour package.

- **Get All Bookings by User**  
  `GET /api/booking/getAllBooking/:id`  
  Retrieve all bookings for a specific user.

### Review Endpoints

- **Create Review**  
  `POST /api/review/create-review`  
  Create and submit a review for a specific tour.

- **Get Reviews for a Tour**  
  `GET /api/review/getTourReviews/:id`  
  Fetch reviews and calculate average ratings for a specific tour.

  ## User Roles and Permissions

WildLens Tours implements **Role-Based Access Control (RBAC)** to manage permissions for different user types. This ensures that only authorized users can perform specific actions, such as creating tours or managing users.

### Roles

- **User:**
  - Regular users who can browse tours, book tours, and leave reviews.

- **Admin:**
  - Users with full access to the system. Admins can manage all users, tours, and bookings, and they have the authority to moderate reviews.

### Permissions

- **Create/Update/Delete Tours:**
  - Only admins can perform these actions.

- **Manage Users:**
  - Only admins have the authority to manage user accounts, including deleting or suspending users.

- **Moderate Reviews:**
  - Admins can moderate reviews to ensure that inappropriate content is removed from the platform.

 ## User Flow

The user flow describes the journey of a user as they interact with the WildLens Tours platform. Understanding the user flow helps in designing a user-friendly interface and ensuring smooth interactions.

### User Journey

1. **Sign-Up/Login:**
   - New users can create an account using their email and password or through Google OAuth.
   - Existing users can log in to access their account.

2. **Browse Tours:**
   - After logging in, users can browse available tours.
   - They can search and filter tours based on criteria like location, price, and duration.

3. **Book a Tour:**
   - Once a user finds a tour they are interested in, they can book it by selecting a date and completing the payment process.

4. **Review Tour:**
   - After the tour, users can leave a review, rating their experience and providing feedback for future users.

5. **Admin Actions:**
   - Admins can monitor the platform, manage tours, users, and reviews, and ensure the system runs smoothly.
## Usage

This section explains how to use the WildLens Tours platform effectively, including how users and admins can navigate the system.

### User Guide

1. **Creating an Account:**
   - To create an account, users need to provide a valid email and password or use Google OAuth for a quicker sign-up process.

2. **Booking a Tour:**
   - Once logged in, users can browse available tours, select a preferred date, and proceed to payment. After successful payment, the booking is confirmed.

3. **Leaving a Review:**
   - After completing a tour, users can leave a review by navigating to the tour page and submitting their rating and comments.

### Admin Guide

1. **Managing Tours:**
   - Admins can create, update, or delete tours through the admin dashboard. They can also assign guides to tours and set availability.

2. **Managing Users:**
   - Admins can view all users, edit user roles, and suspend or delete accounts if necessary.

3. **Moderating Reviews:**
   - Admins can review and delete inappropriate reviews to maintain the quality of content on the platform.

## Security Considerations

Security is a top priority for WildLens Tours. This section outlines the measures taken to protect user data and ensure the integrity of the system.

1. **Password Encryption:**
   - Passwords are hashed using bcrypt before being stored in the database. This ensures that even if the database is compromised, the passwords remain secure.

2. **JWT Token Expiry:**
   - JWT tokens have a set expiry time, limiting the window of opportunity for potential misuse. Users are required to re-authenticate after the token expires.

3. **Data Validation and Sanitization:**
   - Input data is validated and sanitized to prevent common attacks like SQL injection and XSS (Cross-Site Scripting). This ensures that only valid and safe data is processed by the system.

4. **Role-Based Access Control:**
   - RBAC ensures that only authorized users can perform specific actions. This reduces the risk of unauthorized access and data breaches.

5. **HTTPS Encryption:**
   - All communication between the frontend and backend is encrypted using HTTPS. This prevents man-in-the-middle attacks and protects sensitive data during transmission.

## Deployment

Deployment involves making the WildLens Tours platform accessible to users by hosting it on a web server. This section covers the deployment process and tools used.

1. **Frontend Deployment:**
   - The frontend is built using React and can be deployed to platforms like Netlify or Vercel. These platforms provide easy deployment and continuous integration capabilities.

2. **Backend Deployment:**
   - The backend, built with Express and MongoDB, can be deployed to platforms like Heroku or AWS. These platforms provide scalability and reliability, ensuring that the backend can handle a large number of requests.

3. **Environment Variables:**
   - Environment variables, such as API keys and database credentials, should be securely stored in the deployment platform. Ensure that sensitive information is not exposed in the codebase.

4. **Continuous Integration/Continuous Deployment (CI/CD):**
   - CI/CD pipelines automate the deployment process, ensuring that new changes are tested and deployed seamlessly. This reduces the risk of errors during deployment and allows for faster updates.

## Troubleshooting

### Common Issues

1. **Firebase Unauthorized Domain Error:**
   - Ensure the domain is whitelisted in the Firebase console under "Authentication -> Sign-in method -> Authorized domains".

2. **CORS Errors:**
   - Verify CORS settings on the backend. Ensure the frontend domain is allowed to make requests.

3. **Payment Errors (Stripe):**
   - Double-check the API keys and ensure the payment intents are being created correctly.

4. **Deployment Issues:**
   - If deployment fails, check the build logs for errors, ensure environment variables are correctly set, and confirm the correct build directory is being used.

### Debugging Tips

1. **Logs:**
   - Use `console.log()` and error logs to debug issues in both frontend and backend.

2. **Postman:**
   - Test API endpoints using Postman to ensure they return the expected results.

3. **Browser DevTools:**
   - Use the browser's developer tools to inspect network requests, console errors, and component behavior.

## Future Enhancements

### Short-Term Goals

1. **Refine Search Functionality:**
   - Enhance the search filters with additional criteria such as tour difficulty levels.

2. **Tour Guide Dashboard:**
   - Implement a dashboard for tour guides to manage their tours more effectively.

3. **Multilingual Support:**
   - Add support for multiple languages to reach a broader audience.

### Long-Term Goals

1. **Mobile Application:**
   - Develop a mobile app using React Native to provide a native experience for users.

2. **AI-Powered Recommendations:**
   - Integrate AI to improve the recommendation engine based on user behavior and preferences.

3. **Chat Support:**
   - Implement real-time chat support for users to communicate with guides or customer support.

4. **Referral Program:**
   - Introduce a referral program to incentivize users to invite friends.


## Conclusion

The WildLens Tours project is a comprehensive platform that combines modern web technologies with best practices in security, testing, and deployment. By following this technical documentation, developers can contribute to the project, maintain the codebase, and ensure that the platform remains reliable and scalable.


















