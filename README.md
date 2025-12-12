<div align="center">

# 🍳 Chef Lokal - Client

### *Your Gateway to Authentic Home-Cooked Meals*

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://chef-lokal.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pot%20of%20Food.png" alt="Pot of Food" width="150" height="150" />

---

### 🌟 Connecting Home Chefs with Food Lovers

</div>

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [NPM Packages](#-npm-packages-used)
- [Contact](#-contact)

---

## 🎯 About The Project

**Chef Lokal** is a modern online marketplace that bridges the gap between talented home chefs and food enthusiasts seeking authentic, homemade meals. Our platform empowers local chefs to monetize their culinary skills while providing customers with access to fresh, affordable, and delicious home-cooked food.

### 💡 The Problem We Solve

- **For Chefs:** Limited opportunities to earn from home cooking without opening a restaurant
- **For Customers:** Difficulty finding authentic, homemade meals from trusted local chefs
- **For Communities:** Lack of platforms supporting local culinary talent

---

## ✨ Key Features

### 🔐 **Authentication & Authorization**
- Secure user registration and login with Firebase Authentication
- JWT-based token authentication for API security
- Role-based access control (User, Chef, Admin)
- Protected routes with automatic redirection

### 🍽️ **For Customers**
- Browse daily meal menus from local chefs
- Advanced sorting and filtering options
- Real-time order tracking with status updates
- Add meals to favorites for quick access
- Leave ratings and reviews for meals
- Secure payment integration with Stripe
- Order history with detailed information

### 👨‍🍳 **For Chefs**
- Create and manage meal listings with image upload
- Handle incoming order requests
- Update order status (Accept, Deliver, Cancel)
- Track earnings and order statistics
- Manage customer reviews

### 🛡️ **For Admins**
- Comprehensive user management dashboard
- Approve/reject chef and admin role requests
- Mark fraudulent users to protect the platform
- View platform statistics with visual charts
- Monitor all orders and payments

### 🎨 **User Experience**
- Smooth animations powered by Framer Motion
- Responsive design for all devices
- Dynamic page titles for better navigation
- Loading states and error handling
- Toast notifications for user actions
- Pagination for better performance

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | State Management | Styling | Authentication |
|----------|-----------------|---------|----------------|
| React 19.2.0 | TanStack Query | Tailwind CSS 4.1.17 | Firebase 12.6.0 |
| React Router 7.10.1 | Axios 1.13.2 | Framer Motion | JWT |

</div>

---

## 🌐 Live Demo

🚀 **Visit the live application:** [https://chef-lokal.vercel.app/](https://chef-lokal.vercel.app/)


---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TusharChow20/project-Chef-Lokal.git
   cd chef-lokal-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_URL=your_backend_api_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:5000` |
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSyXXXXXXXXXXXXXXXXX` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `chef-lokal.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `chef-lokal` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `chef-lokal.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | `123456789012` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123456789012:web:xxxxx` |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key | `pk_test_xxxxxxxxxxxxx` |

---

## 📦 NPM Packages Used

### Core Dependencies
- **react** (^19.2.0) - JavaScript library for building user interfaces
- **react-dom** (^19.2.0) - React package for DOM manipulation
- **react-router** (^7.10.1) - Declarative routing for React applications

### UI & Styling
- **tailwindcss** (^4.1.17) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.17) - Tailwind CSS Vite plugin
- **framer-motion** (^12.23.25) - Production-ready animation library
- **motion** (^12.23.25) - Motion components for React
- **lucide-react** (^0.556.0) - Beautiful & consistent icon toolkit
- **react-icons** (^5.5.0) - Popular icon packs as React components
- **gsap** (^3.13.0) - Professional-grade animation library
- **lottie-react** (^2.4.1) - Lottie animations for React
- **swiper** (^12.0.3) - Modern mobile touch slider

### Radix UI Components
- **@radix-ui/react-dialog** (^1.1.15) - Accessible dialog component
- **@radix-ui/react-separator** (^1.1.8) - Visual divider component
- **@radix-ui/react-slot** (^1.2.4) - Merge props and behavior utilities
- **@radix-ui/react-tooltip** (^1.2.8) - Accessible tooltip component

### State Management & Data Fetching
- **@tanstack/react-query** (^5.90.12) - Powerful data synchronization for React
- **axios** (^1.13.2) - Promise-based HTTP client

### Forms & Validation
- **react-hook-form** (^7.68.0) - Performant, flexible form library

### Authentication & Backend
- **firebase** (^12.6.0) - Firebase SDK for authentication and storage

### Charts & Visualization
- **recharts** (^3.5.1) - Composable charting library for React

### Utilities
- **class-variance-authority** (^0.7.1) - CSS-in-JS variant API
- **clsx** (^2.1.1) - Utility for constructing className strings
- **tailwind-merge** (^3.4.0) - Merge Tailwind CSS classes without conflicts
- **sweetalert2** (^11.26.4) - Beautiful, responsive popup boxes

---

## 👥 User Roles

### 🙋‍♂️ Customer (Default Role)
- Browse and search meals
- Place orders
- Track order status
- Leave reviews and ratings
- Manage favorites
- Request to become a chef

### 👨‍🍳 Chef
- All customer features
- Create and manage meal listings
- Handle order requests
- View earnings statistics
- Request to become an admin

### 🛡️ Admin
- All platform access
- Manage users and roles
- Approve/reject role requests
- View platform analytics
- Mark fraudulent accounts



## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

## 📧 Contact

**Project Maintainer:** Your Name

- 📧 Email: tusharchowdhury20211@gmail.com
- 🐙 GitHub: [Tushar Chowdehury](https://github.com/TusharChow20)
- 🌐 Website: [Chef Lokal](https://chef-lokal.vercel.app/)

---

<div align="center">

### 🌟 If you like this project, please give it a star! 🌟

**Made with ❤️ and lots of ☕**

![Cooking Animation](https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Fork%20and%20Knife%20with%20Plate.png)

</div>