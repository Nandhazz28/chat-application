import { createBrowserRouter } from "react-router-dom";

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
    element: <LoginPage />,
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
    element: <ChatPage />,
  },

  {
    path: "/inbox",
    element: <InboxPage />,
  },

  {
    path: "/chat/:conversationId",
    element: <ActiveChatPage />,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },

  {
    path: "/profile/edit",
    element: <EditProfilePage />,
  },

  {
    path: "/settings",
    element: <SettingsPage />,
  },

  {
    path: "/privacy",
    element: <PrivacyPage />,
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