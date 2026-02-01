# TrackSub 💰

<div align="center">

![TrackSub Logo](./tracksub-app/public/wallet.svg)

**Your Personal Subscription Manager**

Track, manage, and optimize your recurring expenses in one beautiful dashboard.

[![JavaScript](https://img.shields.io/badge/JavaScript-98.2%25-yellow)](https://github.com/srivastava-aryan/Tracksub)
[![CSS](https://img.shields.io/badge/CSS-1.6%25-blue)](https://github.com/srivastava-aryan/Tracksub)
[![HTML](https://img.shields.io/badge/HTML-0.2%25-orange)](https://github.com/srivastava-aryan/Tracksub)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**TrackSub** is a full-stack subscription management application designed to help you stay on top of your recurring expenses. Whether it's streaming services, software subscriptions, or membership fees, TrackSub centralizes everything into an intuitive dashboard where you can:

- **Track** all your subscriptions and their renewal dates
- **Categorize** services with custom tags
- **Calculate** your total monthly spending automatically
- **Export** your subscription data to CSV
- **Get reminded** before upcoming renewals via email, SMS, or push notifications
- **Visualize** your spending trends with interactive charts

TrackSub ensures you never miss a payment and helps you make informed decisions about where your money goes.

---

## ✨ Features

### 🔐 Authentication & Security
- **Firebase Authentication** - Secure email/password authentication
- **Protected Routes** - Private dashboard accessible only to authenticated users
- **Persistent Sessions** - Stay logged in across browser sessions

### 📊 Subscription Management
- **Add Subscriptions** - Easily add new subscriptions with name, price, billing date, and tags
- **View Dashboard** - Beautiful, responsive dashboard showing all your subscriptions
- **Interactive Charts** - Visualize spending trends over time
- **Category Tags** - Organize subscriptions by type (Entertainment, Productivity, etc.)
- **Total Cost Calculation** - Automatic monthly spending totals

### 🔔 Smart Reminders
- **Push Notifications** - Browser notifications for upcoming renewals
- **Email Alerts** - Get notified via email before billing dates
- **SMS Notifications** - Optional SMS reminders (Twilio integration)
- **Customizable Timing** - Set reminder days (1, 3, 7, or 14 days before)
- **Auto-Renew Warnings** - Alerts for automatic renewals
- **Price Change Detection** - Get notified when subscription prices change
- **Weekly Digest** - Summary email every Monday

### 📤 Data Export
- **CSV Export** - Download all your subscriptions as CSV
- **One-Click Download** - Export with a single button click

### 🎨 Modern UI/UX
- **Dark/Light Mode** - Theme toggle with persistent preference
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Shadcn UI Components** - Beautiful, accessible components
- **Smooth Animations** - Polished transitions and interactions
- **Collapsible Sidebar** - Optimized navigation for all screen sizes

---

## 🛠 Tech Stack

### **Frontend** (`tracksub-app/`)
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library for building component-based interfaces |
| **Vite** | Lightning-fast build tool and dev server |
| **React Router DOM** | Client-side routing |
| **Tailwind CSS** | Utility-first CSS framework |
| **Shadcn UI** | Accessible component library built on Radix UI |
| **Recharts** | Interactive charting library |
| **Firebase** | Authentication and user management |
| **Axios** | HTTP client for API requests |
| **Lucide React** | Beautiful icon library |
| **Sonner** | Toast notifications |
| **Zod** | TypeScript-first schema validation |
| **PapaParse** | CSV parsing and export |
| **@tanstack/react-table** | Powerful table building |

### **Backend** (`tracksub-server/`)
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web application framework |
| **MongoDB** | NoSQL database for storing user data |
| **Mongoose** | MongoDB object modeling |
| **Twilio** | SMS notification service |
| **node-cron** | Scheduled task runner |
| **CORS** | Cross-Origin Resource Sharing middleware |

---

## 📁 Project Structure

```
Tracksub/
│
├── tracksub-app/                 # Frontend React application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── api/                  # Axios instance configuration
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/               # Shadcn UI components
│   │   │   ├── app-sidebar.jsx   # Application sidebar
│   │   │   ├── chart-area-interactive.jsx
│   │   │   ├── data-table.jsx    # Subscription data table
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── section-cards.jsx # Dashboard stat cards
│   │   │   └── ...
│   │   ├── context/              # React Context providers
│   │   │   ├── AuthContext.jsx   # Firebase auth state
│   │   │   ├── SubscriptionContext.jsx
│   │   │   ├── ReminderContext.jsx
│   │   │   └── ThemeContext.jsx  # Dark/light mode
│   │   ├── firebase/             # Firebase configuration
│   │   ├── hooks/                # Custom React hooks
│   │   ├── pages/                # Route components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddSubscription.jsx
│   │   │   ├── Reminders.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── ...
│   │   ├── utils/                # Utility functions
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── tracksub-server/              # Backend Express API
│   ├── models/
│   │   └── UserModel.js          # MongoDB schemas
│   ├── routes/
│   │   ├── subscriptionRoutes.js # Subscription CRUD
│   │   └── reminderRoutes.js     # Reminder settings
│   ├── index.js                  # Server entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas)
- **Firebase** account (for authentication)
- **Twilio** account (optional, for SMS notifications)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/srivastava-aryan/Tracksub.git
cd Tracksub
```

#### 2. Install Frontend Dependencies
```bash
cd tracksub-app
npm install
```

#### 3. Install Backend Dependencies
```bash
cd ../tracksub-server
npm install
```

### Environment Variables

#### **Frontend** (`tracksub-app/.env`)
Create a `.env` file in the `tracksub-app/` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### **Backend** (`tracksub-server/.env`)
Create a `.env` file in the `tracksub-server/` directory:

```env
PORT=5000
MONGO_URI=YOUR_MONGO_DB_URI
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tracksub

# Twilio (Optional - for SMS notifications)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Running the Application

#### **Development Mode**

1. **Start the Backend Server**
   ```bash
   cd tracksub-server
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd tracksub-app
   npm run dev
   ```
   App runs on `http://localhost:5173`

#### **Production Build**

1. **Build the Frontend**
   ```bash
   cd tracksub-app
   npm run build
   ```

2. **Start the Backend**
   ```bash
   cd tracksub-server
   npm start
   ```

---

## 💡 Usage

### Getting Started
1. **Sign Up** - Create an account with email and password
2. **Log In** - Access your personalized dashboard
3. **Add Subscriptions** - Click "Add Subscription" and fill in details
4. **View Dashboard** - See all subscriptions, charts, and spending totals
5. **Set Reminders** - Configure notification preferences in Settings
6. **Export Data** - Download your subscriptions as CSV

### Dashboard Features
- **Total Monthly Cost** - See your total spending at a glance
- **Active Subscriptions Count** - Track how many services you're subscribed to
- **Interactive Charts** - Visualize spending trends over time
- **Subscription Table** - View, edit, and delete subscriptions
- **Filter by Tags** - Organize by Entertainment, Productivity, etc.

### Reminder Settings
- Toggle push, email, and SMS notifications
- Set reminder timing (1, 3, 7, or 14 days before renewal)
- Enable auto-renew warnings
- Opt in to weekly spending digests

---

## 🔌 API Endpoints

### Subscriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/subscriptions/:uid` | Get all subscriptions for a user |
| `POST` | `/api/subscriptions/:uid` | Create a new subscription |
| `DELETE` | `/api/subscriptions/:id` | Delete a subscription |

### Reminders
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/reminders/:uid` | Get reminder settings for a user |
| `PUT` | `/api/reminders/:uid` | Update reminder settings |

### Example Request
```javascript
// Add a new subscription
POST /api/subscriptions/user123
Content-Type: application/json

{
  "name": "Netflix",
  "price": 15.99,
  "nextBillingDate": "2026-03-01",
  "tag": "Entertainment"
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Shadcn UI** - For beautiful, accessible components
- **Lucide** - For the amazing icon set
- **Recharts** - For the charting library
- **Firebase** - For authentication infrastructure
- **MongoDB** - For database solutions

---

## 📧 Contact

**Aryan Srivastava** - [@srivastava-aryan](https://github.com/srivastava-aryan)

**Project Link:** [https://github.com/srivastava-aryan/Tracksub](https://github.com/srivastava-aryan/Tracksub)

---

<div align="center">

Made with ❤️ by Aryan Srivastava

**[⬆ Back to Top](#tracksub-)**

</div>
