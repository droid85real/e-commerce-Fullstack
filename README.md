<h1 align="center">🛒 ApniShop - MERN E-Commerce Platform</h1><p align="center"> <img src="https://img.shields.io/badge/MERN-Stack-green" alt="MERN Stack"/> <img src="https://img.shields.io/badge/Node.js-18%2B-brightgreen" alt="Node Version"/> <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"/> <img src="https://img.shields.io/badge/API-Swagger-orange" alt="Swagger Docs"/> </p><p align="center"> A full-featured, production-ready e-commerce platform built with the MERN stack. Features a modular backend architecture, secure JWT authentication, and a modern, responsive React frontend. </p><p align="center"> <strong> <a href="https://ecomm-frontend-noz2.onrender.com/" target="_blank">🌐 View Live Demo (Frontend)</a> • <a href="https://e-comm-backend-xchm.onrender.com/" target="_blank">⚙️ Live Backend API</a> </strong> </p>
<br />
⚠️ Note: The backend is hosted on a free Render instance which spins down after 15 minutes of inactivity. The first request after a period of inactivity may take 30–60 seconds to wake up. Please open the backend link and allow a moment for the server to respond when accessing the live demo for the first time.

<br />
<br />

## 🔑 Demo Account

You can explore the application using the following test credentials.

**Email:** user2@gmail.com <br />
**Password:** user2Pass

<br />
<br />

<details>
  <summary>Demo Gifs</summary>
  
  ![auth](https://github.com/user-attachments/assets/8a041403-2530-4071-8e0f-d110c9f71c6c)

  ![home12-ezgif com-optimize](https://github.com/user-attachments/assets/eeb3f815-328d-4627-b76f-abf77c92d6b3)

  ![productdetail](https://github.com/user-attachments/assets/ab196f86-c1ce-4ea1-9187-6c104910daa0)
  
  ![cart](https://github.com/user-attachments/assets/afb86536-b524-4510-bef6-f1949c41403a)
  
  ![wishlist](https://github.com/user-attachments/assets/fadaddde-d7ca-4fcf-ad56-c4d34dfaff1e)
  
  ![trend](https://github.com/user-attachments/assets/6b8e30d1-c03b-4a98-bc59-1445e2e77f8e)

</details>

<br />
<br />

## 🔧 Tech Stack

**Frontend:**  (in `client/`)
+ React
+ Vite
+ TailwindCSS

**Backend:**  (in `server/`)
+ Node.js
+ Express
+ JWT Authentication
+ Swagger API Documentation

**Database:** 
+ MongoDB (local or Atlas)

<br />
<br />


## ✨ Key Features

🔐 Secure Authentication: Full JWT-based user registration and login with protected routes.

🛒 Complete Shopping Flow: Browse products, manage a cart, and proceed through a streamlined checkout process.

📦 Product Management: Dynamic product catalog with details, images, and pricing.

🏗️ Modular Backend: Clean, scalable architecture with separate modules for users, products, and carts.

📊 Interactive API Docs: Automatically generated and interactive Swagger UI documentation for all backend endpoints.

🎨 Modern Frontend: Built with React, Vite for speed, and TailwindCSS for a responsive, utility-first UI.

📱 Responsive Design: Optimized for desktops, tablets, and mobile devices.

<br />
<br />


## 📁 **Project Architecture**
```
e-commerce-fullstack/
 ├─ client/   # frontend (React + Vite)
 ├─ server/   # backend (Node + Express + MongoDB)
 └─ README.md
```

### Backend Architecture
The backend follows a modular architecture pattern:
```
modules/
 ├── products/
 ├── carts/
 └── users/
```
where each module contains:
```
controller → request handling
repository → database queries
model → schema definition
routes → API endpoints
```

**Full Project Folder structure**
```
e-commerce-fullstack/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── Pages/
│   │   ├── Context/
│   │   └── router.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   └── modules/
│   │       ├── products/
│   │       ├── carts/
│   │       └── users/
```

<br />
<br />


## 📚 API Documentation (Swagger)
Swagger UI is available at backend:
```
http://localhost:<PORT>/api-docs
```
<br />
<br />


## Requirements

- Node.js >= 18 (includes npm)
- MongoDB (local installation or MongoDB Atlas)

<br />


## ⚙️ Backend Setup (Server)

(Mandatory step) Open a terminal and go to the server folder:
```bash
cd server
npm install
npm start
```

<br />


## 🗄️ MongoDB Compass Setup (Database)

### ⚙️ Step 1: Create Database and Collection
1. Open **MongoDB Compass**.
2. Connect to your local MongoDB instance.
3. Create a new **database** named `ecommdb`.
4. Inside `ecommdb`, create a **collection** named `products`.

### 📥 Step 2: Import Sample Data
1. Open the `products` collection.
2. Click on **"Add Data" → "Import JSON File"**.
3. Select and import the file **`mockdata_verified.json`**.

✅ **Note:** These steps are **mandatory** for the application to run correctly, as the backend relies on the `products` collection.

<br />


## 🎨 Frontend Setup (Client)

(Optional) Proxy config in the client folder inside `vite.config.js` add
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    proxy: {
      "/api":"http://localhost:3000",
    },
  },
})
```


(Mandatory step) Open a terminal and go to client folder
```bash
cd client
npm install
npm run dev
```
By default, it runs on http://localhost:5173


<br />
<br />


## ☁️ Deployment
This application is configured for easy deployment on platforms like Render.

Live Frontend: https://ecomm-frontend-noz2.onrender.com/

Live Backend: https://e-comm-backend-xchm.onrender.com/

Deployment guides for Render and other popular platforms can be found online.



