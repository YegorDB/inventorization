import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AuthLogin, { authLoginLoader, authLoginAction } from '../auth-login/AuthLogin';
import Group, { groupLoader } from '../group/Group';
import Item, { itemLoader } from '../item/Item';
import Main, { mainLoader } from '../main/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
  },
  {
    path: '/auth/login',
    element: <AuthLogin />,
    loader: authLoginLoader,
    action: authLoginAction,
  },
  {
    path: '/group/:groupId',
    element: <Group />,
    loader: groupLoader,
  },
  {
    path: '/item/:itemId',
    element: <Item />,
    loader: itemLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
