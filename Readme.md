# 🔗 **ShortLink** — The Modern URL Shortener

## ⚡A powerful, full-stack URL shortener built with cutting-edge technologies, designed for ease of use, performance, and insightful analytics.

<img src='https://github.com/user-attachments/assets/aa742bd9-a557-45db-bc6c-7c7022bca61b'alt='url-shortner-poster' width='400px' height='600px'/>

## ✨ Features

- 🔗 **Smart URL Shortening** – Quickly turn long URLs into compact, shareable links
- 📊 **Advanced Analytics** – View click counts, devices, browsers, and locations
- 🔐 **User Authentication** – Secure sign-up and login system with JWT
- 📋 **One-Click Copy** – Instantly copy shortened links to clipboard
- 📱 **Responsive UI** – Fully optimized for desktop and mobile screens

---

## 🛠️ Tech Stack

### 🧩 Frontend

- **Next.js** – React framework with SSR and SSG
- **TypeScript** – Type-safe JavaScript for scalable development
- **Tailwind CSS** – Utility-first CSS styling
- **shadcn/ui** – Accessible components powered by Radix UI + Tailwind
- **ua-parser-js** – Client device detection for analytics

### 🔧 Backend

- **Express.js** – Minimal, fast Node.js server framework
- **MongoDB** – Flexible NoSQL database for storing users and links
- **JWT** – JSON Web Tokens for secure API authentication
- **bcrypt** – Secure password hashing

---

## 📋 Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or Yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🚀 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/Sahil9214/url-shortner
cd shortlink
```

---

## 🧩 Frontend Setup

```bash
cd frontend
npm install # or yarn install
cp .env.local.example .env.local
npm run dev # or yarn dev
```

### Frontend Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install # or yarn install
cp .env.example .env
npm run dev # or yarn dev
```

### Backend Environment Variables (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shortlink
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

---

## 🧪 Running Tests

```bash
# Frontend
cd frontend
npm run test # or yarn test

# Backend
cd backend
npm run test # or yarn test
```

---

## 🛣️ API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/auth/signup` | Register new user   |
| POST   | `/auth/login`  | Login existing user |

### 🔗 URLs

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/url/shorten`  | Create a shortened URL      |
| GET    | `/url/:shortId` | Fetch all URLs for the user |

---

## 📱 Pages

| Route            | Description                               |
| ---------------- | ----------------------------------------- |
| `/`              | Landing page (shorten URLs without login) |
| `/dashboard`     | Dashboard for managing shortened URLs     |
| `/analytics/:id` | Detailed analytics per URL                |
| `/login`         | Login page                                |
| `/signup`        | Sign-up page                              |

---

## 📊 Analytics Dashboard

Gain insights into how your links perform:

- ✅ Total clicks
- 📆 Time-based click trends (daily, weekly, monthly)
- 💻 Device distribution (desktop, mobile, tablet)
- 🌐 Browser usage breakdown
- 🌍 Geographic click distribution
- 🔁 Referrer statistics

---

## 🔐 Security Measures

- 🔒 Passwords hashed with **bcrypt**
- 🔐 JWT-based route protection
- 🚫 CSRF protection enabled
- ✅ Secure token storage and verification

---

## 🤝 Contributing

Want to make ShortLink better? Contributions are welcome!

1. 🍴 Fork this repository
2. 🔧 Create your feature branch: `git checkout -b feature/your-feature-name`
3. ✅ Commit changes: `git commit -m "Add some feature"`
4. 🚀 Push to the branch: `git push origin feature/your-feature-name`
5. 📬 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more info.

---

## 🙌 Acknowledgments

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

Made with ❤️ by **Utkarsh Singhal**

---
