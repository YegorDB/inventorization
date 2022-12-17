import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main, { mainLoader } from '../main/Main';
import Group, { groupLoader } from '../group/Group';

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
    element: <div>Item page</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
