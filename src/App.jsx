// App.js
import React from 'react';
import AuthenticationComponent from './AuthenticationComponent';
import OneDriveComponent from './OneDriveComponent';

const App = () => {
  return (
    <AuthenticationComponent>
      <OneDriveComponent />
    </AuthenticationComponent>
  );
};

export default App;
