# Chat Application – Client

A modern real-time chat application frontend built using React and Vite. This client connects to a Node.js + Socket.io backend and provides real-time messaging, media sharing, and a WhatsApp-like chat UI experience.

## Features

- User authentication (Login / Register)
- Real-time messaging using Socket.io
- Online / offline user status
- Image and media sharing
- Chat history sidebar
- Seen / delivered message status
- Live notifications
- Responsive UI for mobile and desktop
- Fast updates using React state management

## Tech Stack

- React.js
- Vite
- Socket.io-client
- Axios / Fetch API
- React Router DOM
- Context API / Redux (if used)
- CSS / Tailwind / Styled Components

## Project Structure

client/
├── public/
├── src/
│   ├── components/
│   │   ├── chat/
│   │   ├── conversations/
│   │   ├── messages/
│   │   └── ui/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Chat.jsx
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js

## Installation & Setup

### Clone the repository
git clone https://github.com/your-username/chat-app-client.git
cd chat-app-client

### Install dependencies
npm install

### Environment Variables

Create a `.env` file in the root directory:

VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

### Run the application
npm run dev

App will run at:
http://localhost:5173

## Backend Connection

This client connects to a Node.js backend using REST APIs and Socket.io.

Make sure the backend is running before starting the client.

## Build for Production

npm run build

## Key Functional Flow

1. User logs in / registers
2. Selects a chat
3. Sends message via Socket.io
4. Backend stores message
5. Receiver gets real-time update

## Common Issues

Socket not connecting:
- Check backend URL in .env
- Ensure backend is running

CORS error:
- Enable CORS in backend

## Future Improvements

- Voice messages
- Video calls
- Message reactions
- Encryption

## Author
This project was developed by:
-Abzal – Frontend / UI
-Nandha – Backend / API
