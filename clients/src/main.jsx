import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./shared/context/AuthContext";
import { ChatProvider } from "./shared/context/ChatContext";
import ErrorBoundary from "./components/ui/ErrorBoundary";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);