// AuthenticationComponent.js
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './msalInstance.js';
import { AuthProvider } from './AuthProvider.jsx';

const AuthenticationComponent = ({ children }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>{children}</AuthProvider>
    </MsalProvider>
  );
};

export default AuthenticationComponent;
