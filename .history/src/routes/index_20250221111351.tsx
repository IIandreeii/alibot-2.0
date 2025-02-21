import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import ChatProvider from '../pages/chat/context/chat';
import { InputProvider } from '../pages/chat/context/filter';
import { StateMessageProvider } from '../pages/chat/context/filterState';
import { AdminPage } from '../pages/admin';
import LoginForm from '../pages/auth/login';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from 'context/AuthContext';
import { ChatRoomPage, UnSelectedChatPage } from 'pages/chat';
import { TokenUserProvider } from 'pages/chat/chat-room-page/hooks/useAuth';
import { ToastProvider } from 'context/ToastContext';
import { LandingPage } from 'landing';
import TerminosPage from 'landing/pages/terminos';
import PrivacidadPage from 'landing/pages/privacidad';

const ChatPage = React.lazy(() => import('pages/chat/chat-room-page'));

const router = createBrowserRouter([
  {
    path: '/init',
    element: 
    <PrivateRoute>
      <UnSelectedChatPage />
    </PrivateRoute>
  },
  {
    path: '/chat',
    element: (
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/terminos',
    element: <TerminosPage />,
  },
  {
    path: '/privacidad',
    element: <PrivacidadPage />,
  },
  {
    path: '/:id', 
    element: (
      <PrivateRoute>
        <ChatRoomPage />
      </PrivateRoute>
    ),
  },
]);

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ToastProvider>
        <TokenUserProvider>
          <StateMessageProvider>
            <InputProvider>
              <ChatProvider>
                <RouterProvider router={router} />
              </ChatProvider>
            </InputProvider>
          </StateMessageProvider>
        </TokenUserProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
