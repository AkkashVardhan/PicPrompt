<div align="center">

<img src="client/public/favicon.svg" alt="PicPrompt Logo" width="180"/>

# ✨ PicPrompt — AI-Powered Image Generation ✨

> 🎨 Turn your imagination into images with AI.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=20232A)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=20232A)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

**[🌐 Live Demo](https://pic-prompt-ashy.vercel.app) · [📦 GitHub Repository](https://github.com/AkkashVardhan/PicPrompt) · [🐛 Report an Issue](https://github.com/AkkashVardhan/PicPrompt/issues)**

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Demo and Deployment](#demo-and-deployment)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Overview](#api-overview)
- [Usage Guide](#usage-guide)
- [Build and Deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

**PicPrompt** is a full-stack, AI-powered image-generation platform that turns text prompts into images using the ClipDrop API. Users can create an account, generate images, manage generation credits, and browse their creations through a responsive interface.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas / MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| Image Generation | ClipDrop API |
| Deployment | Vercel (frontend), Render (backend) |

## ✨ Features

- 🔐 **Authentication:** User registration and login.
- 🎨 **AI image generation:** Create images from text prompts.
- 🖼️ **Image gallery:** Browse generated images and their metadata.
- 📊 **Credits:** Track image-generation usage according to the app's credit logic.
- 👤 **Account management:** Manage profile and account settings.
- 📱 **Responsive interface:** Designed for desktop, tablet, and mobile screens.

## 🌐 Demo and Deployment

- **Frontend:** [https://pic-prompt-ashy.vercel.app](https://pic-prompt-ashy.vercel.app)
- **Backend:** [https://picpromptbackend.onrender.com](https://picpromptbackend.onrender.com)
- **Repository:** [https://github.com/AkkashVardhan/PicPrompt](https://github.com/AkkashVardhan/PicPrompt)

> Render free instances may take a little time to respond after a period of inactivity.

## 📁 Project Structure

```text
PicPrompt/
├── client/                  # React + Vite frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/           # Images, icons, and other assets
│   │   ├── components/       # Reusable UI components
│   │   ├── config/           # Frontend configuration
│   │   ├── context/           # React context and application state
│   │   ├── pages/             # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                  # Express backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Middleware
│   ├── models/              # Mongoose models
│   ├── routes/               # API routes
│   ├── server.js
│   └── package.json
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (use a version compatible with the project)
- npm
- Git
- A MongoDB connection string
- A ClipDrop API key

### 1. Clone the repository

```bash
git clone https://github.com/AkkashVardhan/PicPrompt.git
cd PicPrompt
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `server/.env` file and add the variables expected by your backend:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
CLIPDROP_API=your_clipdrop_api_key
```

Then start the backend using the script defined in `server/package.json`. If that script is named `server`, run:

```bash
npm run server
```

If your backend uses a different start script, use the script defined in that file.

### 3. Frontend setup

Open a second terminal:

```bash
cd client
npm install
```

Create `client/.env` and set the API URL variable used by your frontend code. For example, if the frontend reads `VITE_API_URL`:

```env
VITE_API_URL=http://localhost:4000
```

Start the Vite development server:

```bash
npm run dev
```

> **Important:** The environment-variable name and local backend port must match your code. Vite exposes only variables prefixed with `VITE_` to frontend code.

## ⚙️ Configuration

### Backend environment variables

Configure these in `server/.env` locally and in the backend service's environment settings when deployed:

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the server; on Render, the app should listen on the port supplied by the platform. |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign/verify tokens |
| `CLIPDROP_API` | ClipDrop API key |

Use the exact variable names referenced by your backend code. Never commit real credentials or API keys.

### Frontend environment variables

For the deployed frontend, configure the API URL in Vercel's **Project Settings → Environment Variables**. The current backend URL is:

```text
https://picpromptbackend.onrender.com
```

The variable name must match the one read by your frontend code (for example, `VITE_API_URL`). After changing a Vite environment variable, create a new deployment for the change to take effect.

## 🔌 API Overview

The API routes below are examples of common operations. Exact paths depend on the routes configured in `server/routes/`; check those files if an endpoint differs.

| Operation | Method | Example route |
|---|---|---|
| Register | POST | `/api/user/register` |
| Login | POST | `/api/user/login` |
| Generate an image | POST | Check the image routes in `server/routes/` |
| Retrieve user images | GET | Check the image routes in `server/routes/` |

Authenticated requests must use the authentication mechanism implemented by the backend. If it uses bearer tokens, include:

```http
Authorization: Bearer <token>
```

## 🧭 Usage Guide

1. Open the [live application](https://pic-prompt-ashy.vercel.app).
2. Register for an account or log in.
3. Enter a text prompt and generate an image.
4. Browse your generated images in the gallery.
5. Manage your account and credits through the available settings.

Available features depend on the current application implementation.

## 🏗️ Build and Deployment

### Frontend — Vercel

- **Repository:** `AkkashVardhan/PicPrompt`
- **Root directory:** `client`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:** Set the frontend API URL variable to `https://picpromptbackend.onrender.com`, using the exact variable name expected by your code.

### Backend — Render

- **Root directory:** `server`
- **Build command:** `npm install`
- **Start command:** Use the start script configured in `server/package.json`.
- Add the required backend environment variables in Render's environment settings.

## 🧰 Troubleshooting

- **API URL contains `undefined`:** Check the frontend's Vite environment-variable name and make sure it is configured in Vercel. Redeploy after changing it.
- **Login or registration fails:** Confirm the frontend is calling the correct Render backend URL and inspect the backend logs.
- **MongoDB connection fails:** Verify the MongoDB connection string, database user credentials, and Atlas network access rules.
- **ClipDrop requests fail:** Verify the API key on the backend and check the provider's response.
- **CORS errors:** Ensure the backend permits requests from the deployed frontend domain.
- **Environment changes do not appear:** Restart the local development server or redeploy the frontend.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Open a pull request describing the changes.
5. Never commit API keys, passwords, or other secrets.

## 📄 License

See the [`LICENSE`](LICENSE) file if one is present in the repository. If you intend to distribute this project under the MIT License, ensure the repository includes the MIT license text.

## 👨‍💻 Author

**Akkash Vardhan S**

- GitHub: [@AkkashVardhan](https://github.com/AkkashVardhan)
- Project: [PicPrompt](https://github.com/AkkashVardhan/PicPrompt)

---

<div align="center">

Made with ❤️ by **Akkash Vardhan S**

</div>
