// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { msalInstance } from './msalInstance';
import { loginRequest } from './msalConfig';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { instance } = useMsal();

  useEffect(() => {
    const checkAccount = () => {
      const accounts = instance.getAllAccounts();
      setIsAuthenticated(accounts.length > 0);
    };

    checkAccount();
  }, [instance]);

  const login = async () => {
    try {
      await instance.loginPopup(loginRequest);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    instance.logoutPopup();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
