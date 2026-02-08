# UberClone - Ride Sharing Application

A full-stack ride-sharing application built with **Node.js/Express** backend and **React/Vite** frontend with real-time features using WebSockets.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Key Components](#key-components)

---

## 🎯 Project Overview

OPQ is a modern ride-sharing platform that connects users and captains (drivers) in real-time. The application features user authentication, real-time ride matching, GPS tracking, and live communication between users and captains using WebSocket technology.

**Key Functionalities:**
- User and Captain registration/login
- Real-time ride matching
- Live location tracking
- Ride confirmation and completion
- User and Captain profiles
- Authentication with JWT tokens

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken)
- **Real-time Communication:** Socket.IO
- **Password Hashing:** bcrypt
- **Validation:** express-validator
- **HTTP Client:** Axios
- **Environment Management:** dotenv

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Real-time:** Socket.IO Client
- **Maps:** Leaflet & React-Leaflet
- **Animations:** GSAP
- **Icons:** Remixicon
- **HTTP Client:** Axios

---

## 📁 Project Structure

```
opq/
├── Backend/
│   ├── api/                    # API endpoints
│   │   └── hello.js
│   ├── controllers/            # Business logic
│   │   ├── captain.controller.js
│   │   ├── map.controller.js
│   │   ├── ride.controller.js
│   │   └── user.controller.js
│   ├── db/                     # Database connection
│   │   └── db.js
│   ├── middlewares/            # Express middlewares
│   │   └── auth.middleware.js
│   ├── models/                 # MongoDB schemas
│   │   ├── blacklistToken.model.js
│   │   ├── captain.model.js
│   │   ├── ride.model.js
│   │   └── user.model.js
│   ├── routes/                 # API routes
│   │   ├── captain.routes.js
│   │   ├── maps.routes.js
│   │   ├── ride.routes.js
│   │   └── user.routes.js
│   ├── services/               # Service layer
│   │   ├── captain.service.js
│   │   ├── maps.service.js
│   │   ├── ride.service.js
│   │   └── user.service.js
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   ├── socket.js               # WebSocket handlers
│   ├── package.json
│   ├── .env                    # Environment variables
│   └── vercel.json
│
└── frontend/
    ├── src/
    │   ├── Components/         # Reusable components
    │   │   ├── CaptainDetails.jsx
    │   │   ├── ConfirmRide.jsx
    │   │   ├── ConfirmRidePopUp.jsx
    │   │   ├── LiveTracking.jsx
    │   │   ├── LocationPanel.jsx
    │   │   ├── Lookingfordriver.jsx
    │   │   ├── RidePopUp.jsx
    │   │   ├── VehiclePanel.tsx
    │   │   └── waitfordriver.jsx
    │   ├── context/            # React context for state management
    │   │   ├── CaptainContext.jsx
    │   │   ├── SocketContext.jsx
    │   │   └── UserContext.jsx
    │   ├── pages/              # Page components
    │   │   ├── CaptainHome.jsx
    │   │   ├── Captainlogin.jsx
    │   │   ├── CaptainLogout.jsx
    │   │   ├── CaptainProtectWrapper.jsx
    │   │   ├── Captainsignup.jsx
    │   │   ├── ConfirmRiding.jsx
    │   │   ├── FinishRide.jsx
    │   │   ├── Home.jsx
    │   │   ├── Riding.jsx
    │   │   ├── Start.jsx
    │   │   ├── UserLogin.jsx
    │   │   ├── UserLogout.jsx
    │   │   ├── UserProtectWrapper.jsx
    │   │   └── Usersignup.jsx
    │   ├── assets/             # Static assets
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── eslint.config.js
    ├── .env
    └── index.html
```

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance (local or Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and configure:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and configure:
```env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

---

## ⚙️ Configuration

### Backend Environment Variables
- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `GOOGLE_MAPS_API_KEY` - Google Maps API key for location services or any other free opencage and openrouter

### Frontend Environment Variables
- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - WebSocket server URL

---

## 🚀 Running the Application

### Start Backend Server
```bash
cd Backend
npm start
# or with nodemon for development
npx nodemon server.js
```

The backend server will run on `http://localhost:4000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default)

### Build Frontend for Production
```bash
cd frontend
npm run build
npm run preview
```

---

## 📚 API Documentation

### User Endpoints

#### 1. Register User
- **POST** `/users/register`
- **Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- **Validation:**
  - firstname: min 3 characters
  - lastname: min 3 characters
  - email: valid format and unique
  - password: min 6 characters
- **Response:** JWT token and user object

#### 2. User Login
- **POST** `/users/login`
- **Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- **Response:** JWT token and user object

#### 3. Get User Profile
- **GET** `/users/profile`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** User profile details

### Captain Endpoints
- **POST** `/captains/register` - Register new captain
- **POST** `/captains/login` - Captain login
- **GET** `/captains/profile` - Get captain profile

### Ride Endpoints
- **POST** `/rides/create` - Create a new ride request
- **GET** `/rides/history` - Get ride history
- **PATCH** `/rides/:id/confirm` - Confirm a ride
- **PATCH** `/rides/:id/complete` - Complete a ride

### Maps Endpoints
- **GET** `/maps/get-coordinates` - Get coordinates from address
- **GET** `/maps/get-distance-time` - Calculate distance and time

---

## ✨ Features

### User Features
✅ User registration and authentication  
✅ Real-time ride search and matching  
✅ Live driver tracking with map visualization  
✅ Ride confirmation and status tracking  
✅ User profile management  
✅ Ride history

### Captain Features
✅ Captain registration and authentication  
✅ Real-time ride acceptance  
✅ Live location sharing  
✅ Earnings and ride statistics  
✅ Captain profile management  
✅ Ride completion and payment

### Technical Features
✅ JWT-based authentication  
✅ Real-time WebSocket communication  
✅ MongoDB database with Mongoose  
✅ Input validation and sanitization  
✅ CORS enabled for cross-origin requests  
✅ Password hashing with bcrypt  
✅ Responsive UI with Tailwind CSS  
✅ Interactive maps with Leaflet  
✅ Smooth animations with GSAP  

---

## 🔑 Key Components

### Backend Components

**Authentication Middleware (`auth.middleware.js`)**
- Verifies JWT tokens
- Protects authenticated routes
- Handles token validation and blacklisting

**Socket Handler (`socket.js`)**
- Manages real-time connections
- Handles ride matching events
- Updates live location tracking
- Manages user-captain communication

**Services**
- **User Service:** User registration, login, profile management
- **Captain Service:** Captain registration, login, availability
- **Ride Service:** Ride creation, matching, completion
- **Maps Service:** Distance calculation, route optimization

### Frontend Components

**Context API**
- `UserContext` - User authentication and profile state
- `CaptainContext` - Captain authentication and ride state
- `SocketContext` - WebSocket connection management

**Protected Routes**
- `UserProtectWrapper` - Protects user-only routes
- `CaptainProtectWrapper` - Protects captain-only routes

**Live Features**
- `LiveTracking.jsx` - Real-time driver location
- `Lookingfordriver.jsx` - Driver search UI
- `ConfirmRidePopUp.jsx` - Ride confirmation dialog
- `LocationPanel.jsx` - Pick-up and drop-off selection

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Support

For support or questions, please reach out through GitHub issues.

---

**Last Updated:** February 2026
