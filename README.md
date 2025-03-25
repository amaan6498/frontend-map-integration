# Map Integration Frontend Setup Guide

This project is built using React.js and Node.js to create a secure dashboard application. It includes user authentication, where users can log in, view various interactive dashboard cards, and access a dynamic map integration.

## Backend GitHub Link

https://github.com/amaan6498/map-integration-api.git

## Technologies Used

- **React** - JavaScript library for building user interfaces.
- **React Router DOM** - Used for client-side routing.
- **Cookies (js-cookie)** - Used for handling authentication tokens.
- **Leaflet** - Library for interactive maps.

## Backend (Node.js + Express)

- JWT authentication
- CORS enabled API
- Express.js for handling routes

## Prerequisites

Make sure you have the following installed before proceeding:

- Node.js (latest LTS version recommended)
- npm or yarn (Node Package Manager)

## Installation Steps

1. **Clone the Repository**

   ```sh
   git clone <your-repository-url>
   cd frontend
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Run the Development Server**

   ```sh
   npm start
   ```

   or

   ```sh
   yarn start
   ```

   The application will be available at `http://localhost:3000/`.

## Deployment

To build the project for production, run:

```sh
npm run build
```

or

```sh
yarn build
```

This will create an optimized production build in the `build/` directory, ready for deployment.

## Additional Notes

- Ensure the backend server is running and accessible.
