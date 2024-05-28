// App.js
import React from 'react';
import { Link } from "react-router-dom"
import OneDriveList from './components/one-drive/components/OneDriveList.jsx';
import OneDriveFileUpload from "./components/one-drive/components/OneDriveFileUpload.jsx";
import OneDrive from './components/one-drive'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello from home</h1>
        <div style={{ display: 'flex', gap: 10 }}>
        <Link to="about">About Us</Link>
        <Link to="onedrive">OneDrive</Link>
        </div>
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <h1>Hello from About</h1>
        <Link to="/">Home</Link>
      </div>
    ),
  },
  {
    path: "onedrive",
    element: <OneDrive />,
    children: [
      {
        path: "list",
        element: <OneDriveList />,
      },
      {
        path: "upload",
        element: <OneDriveFileUpload />,
      },
    ]
  },
]);
const App = () => {
  return <RouterProvider router={router}/>
};

export default App;
