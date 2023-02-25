import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AuthLogin, { authLoginLoader, authLoginAction } from '../../pages/auth-login/AuthLogin';
import Group, { groupLoader } from '../../pages/group/Group';
import Item, { itemLoader } from '../../pages/item/Item';
import Main, { mainLoader } from '../../pages/main/Main';
import NeededItemsPage, { neededItemsLoader } from '../../pages/needed-items/NeededItems';
import SearchPage, { searchLoader } from '../../pages/search/Search';

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
  {
    path: '/needed-items',
    element: <NeededItemsPage />,
    loader: neededItemsLoader,
  },
  {
    path: '/search',
    element: <SearchPage />,
    loader: searchLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
