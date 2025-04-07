Here's the full README code you can copy and paste:

````markdown
# 🔗 ShortLink - Modern URL Shortener

ShortLink is a full-stack URL shortener application built with modern technologies to help you create, manage, and analyze shortened URLs.

<img src='https://github.com/user-attachments/assets/aa742bd9-a557-45db-bc6c-7c7022bca61b'/>

## ✨ Features

- **URL Shortening**: Create short, memorable links from long URLs
- **Analytics Dashboard**: Track click counts, geographic data, and referral sources
- **User Authentication**: Secure sign-up and login functionality
- **Copy to Clipboard**: One-click copy functionality for shortened URLs
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **Next.js** - React framework for server-side rendering and static site generation
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautifully designed components built with Radix UI and Tailwind
- **ua-parser-js** - Lightweight JavaScript-based User-Agent string parser

### Backend

- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for storing URL and user data
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing for user security

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Sahil9214/url-shortner
cd shortlink
```
````

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Create .env.local file
cp env.local

# Start development server
npm run dev
# or
yarn dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
# or
yarn install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
# or
yarn dev
```

## 🔧 Configuration

### Frontend Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Backend Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shortlink
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### URLs

- `POST /api/urls` - Create a new short URL
- `GET /api/urls` - Get all URLs for authenticated user
- `GET /api/urls/:shortId` - Get specific URL details
- `GET /api/urls/:shortId/stats` - Get analytics for a specific URL
- `DELETE /api/urls/:shortId` - Delete a URL

## 📱 Pages

### Home (`/`)

The landing page where users can shorten URLs without logging in.

### Dashboard (`/dashboard`)

Overview of all shortened URLs for authenticated users.

### Analytics (`/analytics/:shortId`)

Detailed statistics and insights for each shortened URL.

### Login (`/login`) & Signup (`/signup`)

Authentication pages for user management.

## 📊 Analytics Features

ShortLink provides detailed analytics for each shortened URL:

- Total clicks
- Clicks over time (daily, weekly, monthly)
- Device breakdown (desktop, mobile, tablet)
- Browser statistics
- Geographic distribution of clicks
- Referral sources

## 🔒 Security

- Passwords are hashed using bcrypt
- Authentication handled via JWT
- Protected API routes require valid tokens
- CSRF protection implemented

## 🧪 Running Tests

```bash
# Frontend tests
cd frontend
npm run test
# or
yarn test

# Backend tests
cd backend
npm run test
# or
yarn test
```

## 📚 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

Made with ❤️ by Utkarsh Singhal
