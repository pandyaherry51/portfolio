# Pandya Herry Sanjaykumar - Full Stack Portfolio Monorepo

[![Node.js](https://img.shields.io/badge/Node.js-v18+-68a063?style=flat&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-61dafb?style=flat&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4.21-black?style=flat&logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=flat&logo=mongodb)](https://www.mongodb.com/)

A modern, responsive, and production-ready personal portfolio website and REST API built from scratch for **Pandya Herry Sanjaykumar** (Full Stack Developer & Computer Science Student).

---

## 🌟 Key Features

### Frontend (`/client`)
- **Vite + React**: Lightning-fast compilation and HMR.
- **Tailwind CSS & Framer Motion**: Smooth entrance animations, layout transitions, and fluid interactions.
- **Dark & Light Mode**: Seamless theme switcher with persistent local storage and system OS color scheme detection.
- **Sticky Navbar with Active Section Highlight**: Smooth scroll spy indicating the currently viewed section.
- **Dynamic Projects Section**: Fetches projects in real-time from the Express REST API with skeleton loaders, category filtering, and fallback resilience.
- **Interactive Contact Form**: Client-side validation, anti-spam protection, and toast notifications (success/error).
- **SEO & Accessibility**: Complete Open Graph, Twitter Cards, Semantic HTML5 landmarks, and keyboard accessibility.

### Backend (`/server`)
- **Node.js + Express**: Scalable MVC architecture (Routes, Controllers, Models, Middleware).
- **MongoDB Atlas Integration**: Mongoose ODM with structured schemas for `Project`, `Message`, and `Admin`.
- **Security Best Practices**:
  - `helmet`: Secure HTTP headers.
  - `cors`: Configurable origin whitelisting.
  - `express-rate-limit`: Rate limiting on `/api/contact` (10 requests/15m) and `/api/auth/login` to prevent abuse.
  - `bcryptjs`: Salting and hashing for admin passwords.
  - `jsonwebtoken` (JWT): Stateless authentication for administrative endpoints.
  - `express-validator`: Request body sanitization and schema validation.
- **Contact Notification Service**: Nodemailer integration with live SMTP dispatch and fallback logging.
- **Resilience Fallback**: If MongoDB Atlas or SMTP credentials are not yet configured, the server operates in fallback memory mode so the portfolio never crashes.
- **Uptime Health Check**: `/api/health` providing database connectivity status and process uptime.

---

## 📁 Repository Structure

```text
protfolio/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets (Favicon, OG Image)
│   ├── src/
│   │   ├── components/         # Reusable UI & Layout Components
│   │   │   ├── layout/         # Navbar, Footer, ThemeToggle
│   │   │   ├── sections/       # Hero, About, Skills, Projects, Education, Contact
│   │   │   └── ui/             # ProjectCard, LoadingSkeleton, SectionTitle
│   │   ├── context/            # ThemeContext (Dark/Light Mode)
│   │   ├── hooks/              # useScrollSpy, Custom Hooks
│   │   ├── services/           # Axios API Client
│   │   ├── utils/              # Constants & Content Data
│   │   ├── App.jsx             # Main Application Root
│   │   ├── index.css           # Tailwind Directives & Custom Styles
│   │   └── main.jsx            # React Entry Point
│   ├── index.html              # SEO Meta Tags, Fonts, Landmarks
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env.example
│   └── .env
│
├── server/                     # Backend REST API
│   ├── src/
│   │   ├── config/             # MongoDB connection & Nodemailer configuration
│   │   ├── controllers/        # Project, Contact, Auth, and Health Controllers
│   │   ├── middleware/         # Auth, Error, Rate Limiting, Validation
│   │   ├── models/             # Mongoose Schemas (Admin, Message, Project)
│   │   ├── routes/             # Express API Endpoints
│   │   ├── utils/              # Seed Script & Curated Default Projects
│   │   ├── app.js              # Express Application Config
│   │   └── server.js           # Server Entry & Listener
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── package.json                # Monorepo Orchestration Scripts
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- (Optional) MongoDB local instance or MongoDB Atlas account

### 1. Clone & Install Dependencies

From the project root:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

### 2. Environment Variables Setup

#### Backend (`server/.env`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Atlas or local MongoDB URI
MONGODB_URI=mongodb://localhost:27017/portfolio_db

# JWT Secret for Admin Auth
JWT_SECRET=super_secret_jwt_key_change_in_production_123456
JWT_EXPIRES_IN=7d

# Default Admin Credentials
ADMIN_USERNAME=admin
ADMIN_EMAIL=pandyaherry51@gmail.com
ADMIN_PASSWORD=AdminSecurePassword123!

# Nodemailer Settings (Optional - fallback logs to console if blank)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
NOTIFICATION_RECEIVER_EMAIL=pandyaherry51@gmail.com
```

#### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database (Optional)
To seed initial projects and the superadmin user into MongoDB:
```bash
npm run seed --prefix server
```

### 4. Run Locally

In development mode:

```bash
# Terminal 1: Start Backend Server (port 5000)
cd server
npm run dev

# Terminal 2: Start Frontend Client (port 5173)
cd client
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Health and DB uptime check |
| `GET` | `/api/projects` | Public | Get all projects (supports `?category=` filter) |
| `GET` | `/api/projects/:id` | Public | Get project details by ID or slug |
| `POST` | `/api/projects` | Admin (JWT) | Add a new project |
| `PUT` | `/api/projects/:id` | Admin (JWT) | Update existing project |
| `DELETE` | `/api/projects/:id` | Admin (JWT) | Remove project |
| `POST` | `/api/contact` | Public (Rate-limited) | Send message & notify via email |
| `POST` | `/api/auth/login` | Public (Rate-limited) | Admin login returning JWT token |
| `GET` | `/api/auth/me` | Admin (JWT) | Verify active token & profile |

---

## 🚢 Production Deployment Guide

### Database: MongoDB Atlas
1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Shared Cluster**.
3. Under **Database Access**, create a database user and password.
4. Under **Network Access**, whitelist `0.0.0.0/0` (or your hosting IP range).
5. Copy your connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`.

### Backend: Render or Railway
1. **Render**:
   - Create a **New Web Service** pointing to your Git repository.
   - Root Directory: `server`.
   - Build Command: `npm install`.
   - Start Command: `node src/server.js`.
   - Add Environment Variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `MONGODB_URI`: (Your Atlas URI)
     - `CLIENT_URL`: `https://your-portfolio-client.vercel.app`
     - `JWT_SECRET`: (Generate random 64-character secret)
     - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_EMAIL`

### Frontend: Vercel or Netlify
1. **Vercel**:
   - Import your repository in Vercel.
   - Root Directory: `client`.
   - Framework Preset: `Vite`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Environment Variable:
     - `VITE_API_URL`: `https://your-backend-service.onrender.com/api`

---

## 👤 Author & Contact
- **Name:** Pandya Herry Sanjaykumar
- **LinkedIn:** [https://www.linkedin.com/in/herry-pandya-928b602a3](https://www.linkedin.com/in/herry-pandya-928b602a3)
- **Email:** [pandyaherry51@gmail.com](mailto:pandyaherry51@gmail.com)

