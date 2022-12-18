import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Group, { groupLoader } from '../group/Group';
import Item, { itemLoader } from '../item/Item';
import Main, { mainLoader } from '../main/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
  },
  {
    path: "/group/:groupId",
    element: <Group/>,
    loader: groupLoader,
  },
  {
    path: "/item/:itemId",
    element: <Item/>,
    loader: itemLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
