import React from "react";
import {Link, Outlet} from "react-router-dom";
import AuthenticationComponent from "./AuthenticationComponent.jsx";

const OneDrive = () => {
  return (
    <>
      <h2>OneDrive</h2>
      <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/onedrive/list">List</Link>
          <Link to="/onedrive/upload">Upload</Link>
      </div>
      <AuthenticationComponent>
      {/*<OneDriveComponent />*/}
        <Outlet/>
      </AuthenticationComponent>

    </>
  )
}

export default OneDrive
