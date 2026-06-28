# Chat Application

A modern full-stack real-time chat application built with **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. The application supports private conversations, real-time messaging, media sharing, voice messages, reactions, replies, profile management, and online presence.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

## User Management

- View Profile
- Edit Profile
- User Search
- Online/Offline Status

## Chat System

- Private Conversations
- Real-time Messaging
- Conversation List
- Message History
- Last Message Preview
- Message Status (Sent, Delivered, Seen)

## Messaging Features

- Text Messages
- Image Messages
- Voice Messages
- File Sharing
- Emoji Reactions
- Reply to Messages
- Edit Messages
- Delete for Me
- Delete for Everyone

## Real-Time Features

- Socket.IO Integration
- Online Presence
- Typing Indicators
- Live Message Updates
- Live Conversation Updates

## UI

- Responsive Design
- Dark Theme
- Modern Chat Interface
- Animated Components

---

# Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Multer
- Cloudinary

---

# Project Structure

```text
chat-application-main
│
├── clients
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── shared
│   │   ├── socket
│   │   └── routes
│   └── public
│
└── Server
    ├── config
    ├── middleware
    ├── modules
    │   ├── auth
    │   ├── user
    │   ├── conversation
    │   ├── message
    │   └── upload
    ├── socket
    ├── utils
    └── validators
```

---

# Architecture

```text
React Client
      │
      ▼
 Axios Service Layer
      │
      ▼
Express REST API
      │
      ▼
Controller Layer
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
MongoDB
```

Real-time communication:

```text
React Client
      │
Socket.IO Client
      │
Socket.IO Server
      │
MongoDB
```

---

# Installation

## Clone the Repository

```bash
git clone <repository-url>
cd chat-application-main
```

---

## Backend Setup

```bash
cd Server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd clients

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file inside the `Server` directory.

Example:

```env
PORT=5550

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

REDIS_URL=
```

---

# API Modules

- Authentication
- Users
- Conversations
- Messages
- Uploads

---

# Major Functionalities

- User Authentication
- Profile Management
- Search Users
- Create Conversations
- Send Messages
- Upload Images
- Voice Messages
- File Sharing
- Reply Messages
- Edit Messages
- Delete Messages
- Emoji Reactions
- Online Status
- Seen Status

---

# Future Improvements

- Group Chat
- Video Calls
- Audio Calls
- Push Notifications
- Message Search
- Archived Chats
- Block Users
- Friend Requests
- Story/Status Feature
- End-to-End Encryption
- Read Receipts per User
- Multi-device Synchronization

---

# Development Notes

The backend follows a layered architecture:

```
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
MongoDB
```

The frontend follows a component-based architecture with:

- Context API
- Service Layer
- Socket Manager
- Reusable Components
- Protected Routes

---

# License

This project is intended for educational and portfolio purposes.

---

# Author
This project was developed by:
-Abzal – Frontend / UI
-Nandha – Backend / API
