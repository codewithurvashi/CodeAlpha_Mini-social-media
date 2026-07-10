# 📱 Mini Social Media App

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** social media application that allows users to connect, share posts, interact with others, and manage their profiles through a modern and responsive interface.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 📝 Create, Edit, and Delete Posts
- ❤️ Like and Unlike Posts
- 💬 Comment on Posts
- 👥 Follow & Unfollow Users
- 📄 User Profile Management
- 📱 Responsive UI
- 🔒 Protected Routes
- ⚡ RESTful API Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt.js

---

## 📂 Project Structure

```
mini-social-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mini-social-app.git
```

### 2. Navigate to the project

```bash
cd mini-social-app
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm start
```

The application will run at:

Frontend:
```
http://localhost:3000
```

Backend:
```
http://localhost:5000

---

## 📌 Future Improvements

- 📖 Stories Feature
- 💬 Real-time Chat
- 🔔 Notifications
- 📌 Saved Posts
- 🌙 Dark Mode
- 📤 Image Upload Optimization
- ☁️ Cloudinary Integration
- 🚀 Deployment (Vercel + Render)

---

## 👩‍💻 Developer

**Urvashi Sharma**
