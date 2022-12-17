import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Index from '../index/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: "/group/:groupId",
    element: <div>Group page</div>,
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
