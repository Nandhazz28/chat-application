import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ui/ProtectedRoute";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import ChatPage from "./pages/chat/ChatPage";
import InboxPage from "./pages/chat/InboxPage";
import ActiveChatPage from "./pages/chat/ActiveChatPage";

import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";

import SettingsPage from "./pages/settings/SettingsPage";
import PrivacyPage from "./pages/settings/PrivacyPage";

import NotFoundPage from "./pages/errors/NotFoundPage";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inbox",
    element: (
      <ProtectedRoute>
        <InboxPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat/:conversationId",
    element: (
      <ProtectedRoute>
        <ActiveChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/edit",
    element: (
      <ProtectedRoute>
        <EditProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/privacy",
    element: (
      <ProtectedRoute>
        <PrivacyPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;