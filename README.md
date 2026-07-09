# Lobaz Richit J — Full-Stack Portfolio Website

A production-ready personal portfolio built with the MERN stack (MongoDB, Express, React, Node.js), featuring a public site and a secure admin dashboard for managing content.

---

## 1. Project Overview

This is a full-stack portfolio for Lobaz Richit J, a B.E. CSE (IoT) student. It includes:

- A public-facing site (Home, About, Skills, Projects, Certificates, Experience, Contact)
- A JWT-secured Admin Dashboard to manage Projects, Certificates, Experience entries, and view Contact messages
- A REST API backend with MongoDB persistence, image uploads, and email notifications

---

## 2. Features

**Public Site**
- Animated hero with typing effect, floating background orbs, scroll indicator
- About page with education, achievements, languages, interests
- Skills page with animated, scroll-triggered progress bars
- Projects page: live search + category filter, backed by MongoDB
- Certificates gallery with category filter
- Experience timeline (internships, hackathons, workshops, NCC, achievements)
- Contact form with client + server-side validation, email notification via Nodemailer
- Dark/light theme toggle, mobile-responsive nav, back-to-top button, 404 page
- SEO: meta tags, Open Graph, Twitter Card, sitemap.xml, robots.txt
- PWA-ready (installable, offline shell via vite-plugin-pwa)

**Admin Dashboard** (`/admin`)
- JWT login (access token + httpOnly refresh token cookie, auto-refresh on expiry)
- Dashboard analytics: content counts + recent messages
- Full CRUD for Projects (with image upload), Certificates (with image upload), Experience
- View / mark-as-read / delete Contact messages
- Protected routes — redirects to login if not authenticated

**Backend**
- MVC architecture (models / controllers / routes / middleware)
- express-validator input validation on every write route
- Centralized error handling (Mongoose, JWT, Multer errors normalized)
- Rate limiting on login and contact-form routes
- Helmet, CORS, compression, Morgan logging

---

## 3. Folder Structure

```
portfolio-project/
├── backend/
│   ├── config/            # db.js, multer.js
│   ├── controllers/       # business logic per resource
│   ├── middleware/        # auth, error handling, validation, rate limiting
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routers
│   ├── utils/             # JWT + email helpers
│   ├── uploads/            # uploaded images (gitignored, .gitkeep tracked)
│   ├── seedAdmin.js        # creates the one admin account
│   ├── seedData.js         # optional: prefills projects/certs/experience from resume
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/              # favicon, robots.txt, sitemap.xml, resume.pdf (add yours), profile.jpg (add yours)
│   ├── src/
│   │   ├── components/      # Navbar, Footer, Modal, ProjectCard, etc.
│   │   ├── context/         # AuthContext, ThemeContext
│   │   ├── constants/       # personalData.js — bio/education/skills content
│   │   ├── pages/           # Home, About, Skills, Projects, Certificates, Experience, Contact, admin/*
│   │   ├── services/api.js  # Axios instance with auto token-refresh
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vercel.json
│   ├── package.json
│   └── .env.example
├── render.yaml             # Render blueprint for backend deployment
└── README.md
```

---

## 4. Environment Variables

### Backend (`backend/.env` — copy from `.env.example`)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Long random strings (generate with the command in `.env.example`) |
| `JWT_ACCESS_EXPIRE` / `JWT_REFRESH_EXPIRE` | Token lifetimes (defaults: `15m`, `7d`) |
| `CLIENT_URL` | Your deployed frontend URL, for CORS |
| `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` | Gmail + **App Password** for Nodemailer |
| `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Used once by `seedAdmin.js` |

### Frontend (`frontend/.env` — copy from `.env.example`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL, e.g. `http://localhost:5000/api` in dev |

---

## 5. Running the Backend

```bash
cd backend
npm install
cp .env.example .env      # then fill in real values
npm run seed:admin        # creates your admin login (run once)
npm run seed:data         # optional: prefills projects/certificates/experience
npm run dev               # starts on http://localhost:5000 with nodemon
```

Health check: `GET http://localhost:5000/api/health`

---

## 6. Running the Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev                # http://localhost:5173
```

**Before running**, add these files to `frontend/public/`:
- `resume.pdf` — your resume (linked by the Download Resume button)
- `profile.jpg` — your profile photo (used in the hero section)
- `icon-192.png`, `icon-512.png` — PWA icons
- `og-image.png` — social share preview image

---

## 7. Deployment

### Frontend → Vercel
1. Push the repo to GitHub.
2. Import the project in Vercel, set the **root directory** to `frontend`.
3. Build command: `npm run build`, output directory: `dist` (Vercel auto-detects Vite).
4. Add environment variable `VITE_API_URL` pointing to your deployed Render backend, e.g. `https://your-backend.onrender.com/api`.
5. `vercel.json` (included) handles SPA routing rewrites.

### Backend → Render
1. Push the repo to GitHub.
2. Render can read `render.yaml` at the repo root automatically ("Blueprint" deploy), or create a Web Service manually with root directory `backend`.
3. Build command: `npm install`, start command: `npm start`.
4. Set all env vars from the table above in the Render dashboard (`MONGO_URI`, `CLIENT_URL`, email credentials, etc. — JWT secrets can be auto-generated by the blueprint).
5. After first deploy, run `npm run seed:admin` via Render's shell (or locally against the same `MONGO_URI`) to create your admin login.

### Database → MongoDB Atlas
1. Create a free cluster at mongodb.com/cloud/atlas.
2. Create a database user and allow network access from `0.0.0.0/0` (or Render's IPs).
3. Copy the connection string into `MONGO_URI` in both your local `.env` and Render's environment variables.

---

## 8. API Documentation

Base URL: `/api`

| Resource | Method | Route | Access | Notes |
|---|---|---|---|---|
| Health | GET | `/health` | Public | |
| Auth | POST | `/auth/login` | Public | Rate-limited |
| Auth | POST | `/auth/logout` | Private | |
| Auth | POST | `/auth/refresh` | Public | Uses httpOnly cookie |
| Auth | GET | `/auth/me` | Private | |
| Projects | GET | `/projects` | Public | `?search=&category=&technology=` |
| Projects | GET | `/projects/:id` | Public | |
| Projects | POST | `/projects` | Private | multipart/form-data, field `image` |
| Projects | PUT | `/projects/:id` | Private | |
| Projects | DELETE | `/projects/:id` | Private | |
| Certificates | GET/POST/PUT/DELETE | `/certificates[/:id]` | Public (GET) / Private (write) | |
| Experience | GET/POST/PUT/DELETE | `/experience[/:id]` | Public (GET) / Private (write) | |
| Messages | POST | `/messages` | Public | Rate-limited, triggers email |
| Messages | GET | `/messages` | Private | |
| Messages | PUT | `/messages/:id/read` | Private | |
| Messages | DELETE | `/messages/:id` | Private | |
| Dashboard | GET | `/dashboard/stats` | Private | Counts + recent messages |

All private routes require `Authorization: Bearer <accessToken>`.

---

## 9. Testing Checklist

1. `GET /api/health` returns `200`.
2. Log in at `/admin/login` with your seeded admin credentials.
3. Create a project with an image in the admin panel → confirm it appears on `/projects` with search/filter working.
4. Submit the public contact form → confirm the message appears under Admin → Messages and (if email is configured) an email notification arrives.
5. Refresh the page while logged into `/admin` → session should persist (refresh token flow).
6. Log out → confirm admin routes redirect to `/admin/login`.

---

## 10. Future Improvements

- Blog section with markdown-based posts
- Testimonials carousel
- Visitor counter + Google Analytics integration
- GitHub API integration to auto-display latest repos
- Automated tests (Jest/Supertest for API, Vitest/RTL for frontend)
- Image optimization pipeline (WebP conversion, responsive `srcset`)
