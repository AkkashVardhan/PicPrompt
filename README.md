
<div align="center">

<img src="client/public/favicon.svg" alt="Imagify Logo" width="180"/>

# ✨ PicPrompt - AI Transforming Your Images Magically ✨

> 🎨 Where Creativity Meet Technology

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=20232A)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=20232A)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-4.18.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)


---

</div>


# PicPrompt — AI Image Generation Platform

## Live **In:** [https://picprompt-1.onrender.com/](https://picprompt-1.onrender.com/)

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Demo & Deployment](#demo--deployment)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Configuration](#configuration)
- [API Overview](#api-overview)
- [Usage Guide](#usage-guide)
- [Build & Deployment](#build--deployment)
- [Common Issues & Solutions](#common-issues--solutions)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Support](#contact--support)

***

## Overview

**PicPrompt** is an open-source, full-stack AI-powered platform allowing users to instantly generate high-quality images from text prompts using the latest AI models (e.g., ClipDrop API). Built on the MERN stack, PicPrompt supports user registration, authentication, credit tracking, an image gallery with search, and profile management — all wrapped in a performant, responsive, and modern interface.

***

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React.js, Vite, TailwindCSS                     |
| Backend    | Node.js, Express.js                             |
| Database   | MongoDB (Atlas or local)                        |
| Auth       | JWT (JSON Web Tokens)                           |
| Image AI   | ClipDrop API                                    |
| Styling    | TailwindCSS, custom CSS, Outfit font (Google)   |
| Deployment | Render (frontend and backend), Vercel/Netlify-ready |

***

## Features

- 🔐 **User authentication** — JWT-based, secure signup/login.
- 🎨 **AI text-to-image** — Generate images from text prompts (ClipDrop).
- 👤 **Profile management** — Update info, delete account, manage credits.
- 📊 **Credits** — Track usage/limits for AI generations.
- 🖼️ **Image gallery** — Stores generated images with metadata.
- 🔎 **Search & filter** — Find images by prompt, date, or tags.
- 💻 **Responsive design** — Works on mobile, tablet, desktop.
- ⚡ **Fast setup** — Vite-powered frontend and hot reload dev experience.
- 🔒 **Secure** — API key, secrets, and image data handled privately.

***

## Demo & Deployment

- **Frontend:** [https://picprompt-1.onrender.com/](https://picprompt-1.onrender.com/)
- **Backend API:** [https://picprompt-rvgy.onrender.com/](https://picprompt-rvgy.onrender.com/)

***

## Folder Structure

```
PicPrompt/
│
├── client/           # Frontend (React + Vite)
│   ├── public/       # Static assets (favicon, meta, index.html)
│   ├── src/
│   │   ├── assets/   # SVGs, images, icons
│   │   ├── components/ # Shared UI components
│   │   ├── context/  # React context (auth, state)
│   │   ├── pages/    # Main route pages
│   │   ├── index.css # Main CSS (Tailwind + custom)
│   │   └── main.jsx  # Entrypoint
│   ├── .env          # Frontend env (not committed)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/           # Backend (Express API)
│   ├── config/       # DB config (mongodb.js)
│   ├── controllers/  # Route controllers
│   ├── middlewares/  # JWT auth, error handling
│   ├── models/       # Mongoose models (User, Image)
│   ├── routes/       # API routes
│   ├── .env          # Backend env (not committed)
│   ├── server.js
│   └── package.json
│
├── README.md
├── package.json      # Root (optional for monorepo tools)
└── ...               # Other project files
```

***

## Getting Started

### 1. Prerequisites

- Node.js v18+ and npm v9+ installed
- Git
- MongoDB URI (Atlas recommended)  
- ClipDrop API key ([get free trial or paid key](https://clipdrop.co/apis/))
- Render or choose another deployment platform

***

### 2. Backend Setup

```bash
# Open terminal
cd server
npm install

# Create .env (see template below)
touch .env

# Add your environment variables:
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-very-strong-secret
CLIPDROP_API=your-clipdrop-api-key

# Start backend (dev)
npm run server
```

***

### 3. Frontend Setup

```bash
# Open another terminal
cd client
npm install

# Create .env
touch .env

# Add variable (for local dev)
VITE_BACKEND_URL=http://localhost:5000

# For production, set to your Render backend URL:
# VITE_BACKEND_URL=https://picprompt-rvgy.onrender.com

# Run dev server
npm run dev
```

***

## Configuration

### Backend `.env` example

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/PicPrompt
JWT_SECRET=your-very-secure-secret
CLIPDROP_API=your-clipdrop-api-key
```

### Frontend `.env` example

```
VITE_BACKEND_URL=https://picprompt-rvgy.onrender.com
```

***

## API Overview

| Endpoint                    | Method | Description                      | Auth Required |
|-----------------------------|--------|----------------------------------|--------------|
| `/api/v1/auth/register`     | POST   | Register a new user              | No           |
| `/api/v1/auth/login`        | POST   | Login, returns JWT               | No           |
| `/api/v1/image/generate`    | POST   | Generate image from prompt       | Yes          |
| `/api/v1/image/user`        | GET    | Get user’s generated images      | Yes          |
| `/api/v1/image/:id`         | GET    | Get one image by generationId    | Yes          |
| `/api/v1/user/:id`          | PATCH  | Update user settings/profile     | Yes          |

_All API requests (except login/register) require Authorization header:_

```
Authorization: Bearer <token>
```

***

## Usage Guide

1. **Register**
   - Go to the site, click Sign Up, fill your details.
2. **Login**
   - Enter email and password, receive JWT token, begin session.
3. **Generate Images**
   - Enter a prompt (e.g. "a cat surfing on a skateboard"), click "Generate".
   - AI returns your image, view in gallery, download or share.
4. **Manage Images**
   - See all your generations, search, filter, delete if needed.
5. **Credits**
   - Each generation uses credits. Buy more/earn/refill as per app logic.
6. **Settings**
   - Update profile or change password, delete account if desired.

***

## Build & Deployment

### Building for Production

```bash
cd client
npm run build
# Static assets will be in client/dist
```

### Render Deployment

- **Frontend:**
  - Root Directory: `client`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`
  - Env: `VITE_BACKEND_URL=https://picprompt-rvgy.onrender.com`
- **Backend:**  
  - Root Directory: `server`
  - Start command: `npm run server`
  - Add all backend `.env` vars under "Environment"

### Netlify/Vercel

- Set base/root: `client`
- Build command: `npm run build`
- Publish/output: `dist`
- Env: set `VITE_BACKEND_URL` to deployed backend url

***

## Common Issues & Solutions

- **Tailwind build error:**
  - Ensure Tailwind `content` in tailwind.config.js covers all source files.
  - Place all custom styles inside `@layer base` (do **not** use `@reference` in main CSS).
- **API key security:**  
  - Never expose ClipDrop or JWT secrets on frontend or repo.
- **CORS Issues:**  
  - Both servers must allow requests to/from each other in dev.
- **Env variables not read:**  
  - Double-check `.env` file spelling/location and restart dev server after changes.

***

## Contributing

1. Fork the repo, create new feature branch.
2. Add tests/doc where reasonable.
3. Open a Pull Request — describe changes and motivation.
4. Ensure no real secrets in commits.

***

## License

MIT License — see [LICENSE](LICENSE).

***

## Contact & Support

For issues, open a [GitHub issue](https://github.com/singh04ayush/imagify/issues)  
For deployment help, open an issue or reach out directly via project discussions tab.

***

Made with ❤️ by Bhuvanesh.

***
