import React from 'react';
import BaseLayout from '../../layout/baselayout';
import Home from '../../pages/Home/Home';
import NotFound from '../../pages/NotFound/NotFound';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import Chat from '../../pages/messages/chat';
import Profile from '../../pages/profiles/profile';

const routesConfig = [
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '', // Use an empty string for the root route
    element: <BaseLayout />,
    children: [
      {
        path:'/home',
        index: true,
        element: <Home />,
      },
      {
        path:'/chat',
        index: true,
        element: <Chat />,
      },
      {
        path:'/profile',
        index: true,
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routesConfig;
