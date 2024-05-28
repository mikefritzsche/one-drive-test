import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {
  createBrowserRouter, Link,
  RouterProvider,
} from "react-router-dom";
import AuthenticationComponent from "./components/one-drive/AuthenticationComponent.jsx";
import OneDriveList from "./components/one-drive/components/OneDriveList.jsx";

import OneDrive from './components/one-drive'
/*
<MainNav/>
  <Routes>
    <Route path="/" element={ <Home /> }/>
    <Route path="/onedrive" element={ <OneDrive /> }/>
  </Routes>
  }
 */
function MainNav() {
  return (
    <>
      <Link to="/">Home</Link> |
      <Link to="onedrive">OneDrive</Link>
    </>
  )
}
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/onedrive",
    element: <OneDrive />
  }

])

function Home() {
  return (
    <h2>Home</h2>
  )
}
// function OneDrive() {
//   return (
//     <AuthenticationComponent>
//       <>
//         <OneDriveList />
//         {/*<OneDriveFileUpload/>*/}
//       </>
//     </AuthenticationComponent>
//   )
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<RouterProvider router={router}>*/}
    {/*  <>*/}
        {/*<MainNav/>*/}
        <App />
      {/*</>*/}
    {/*</RouterProvider>*/}
  </React.StrictMode>
)
