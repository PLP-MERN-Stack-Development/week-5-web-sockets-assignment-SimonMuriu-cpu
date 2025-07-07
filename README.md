# 💬 Real-Time Chat Application with Socket.io

## 📌 Project Overview

This is a full-stack **real-time chat application** developed using **React**, **Node.js (Express)**, and **Socket.io**. The project demonstrates bidirectional communication between clients and server, supporting global and private messaging, user presence, and advanced features like typing indicators and notifications.

This assignment is part of **Week 5** of the PLP Full Stack MERN program, focusing on building dynamic web apps using **WebSockets**.

---

## 🚀 Setup Instructions

### 🧰 Prerequisites

- Node.js v18 or later
- pnpm or npm
- MongoDB URI (for connecting to your database)

---

### 📥 Installation & Running

1. **Clone the repository:**
Bash..
git clone <your-repo-url> 
cd week-5-web-sockets-assignment-SimonMuriu-cpu


2. **Install Server dependencies:**
Bash..
cd server
pnpm install

3. **install client dependencies**
cd ../client 
pnpm install

4. **Create a .env file in the /server directory with:**
PORT=5000 
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_jwt_secret

5. **Start the development servers:**
# Start the server 
cd server 
pnpm run dev 
# Start the client (in a separate terminal) 
cd ../client 
pnpm run dev



✅ **Features Implemented**
🔹 Core Features
 Real-time messaging using Socket.io

 JWT-based user authentication

 Global chat room

 Online/offline user status

 Message timestamps and sender display

✨ **Advanced Features**
 - Private messaging between users
 - Multiple chat rooms support
 - Typing indicators
 - Read receipts for messages
 - Real-time notifications (join/leave alerts, message alerts)
 - Sound and browser notifications

🖼️ **Screenshots**
Add your images or screen recordings below (chat UI, private chat, typing indicator, etc.)

![alt text](<Screenshot (73).png>) ![alt text](<Screenshot (76).png>) ![alt text](<Screenshot (75).png>) ![alt text](<Screenshot (74).png>)


🧱 **Project Structure**

socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # UI elements
│   │   ├── context/        # Auth and socket context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Login, Chat, etc.
│   │   ├── socket/         # Socket.io client config
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express + Socket.io back-end
│   ├── config/             # MongoDB & environment configs
│   ├── controllers/        # Auth and socket event handling
│   ├── models/             # Mongoose models
│   ├── routes/             # API endpoints
│   ├── socket/             # WebSocket logic
│   ├── utils/              # Helper functions
│   ├── server.js
│   └── package.json



🧪 **Submission Requirements Checklist**
 - Complete server and client code
 - README with project overview
 - Setup instructions provided
 - Core and advanced features implemented
 - Screenshots or GIFs included (to be added)
 - .env excluded from version control


**Resources**
- Socket.io Documentation
- React Documentation
- Express.js Documentation
- Building a Chat Application with Socket.io


👨‍💻 **Author**
Simon Muriu
GitHub: @SimonMuriu-cpu

Developed as part of the PLP Full Stack Web Development Program - Week 5 Assignment