// graphClient.js
import { Client } from '@microsoft/microsoft-graph-client';
import { msalInstance } from './msalInstance.js';
import { loginRequest } from './msalConfig.js';

const getToken = async () => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    throw new Error('No accounts found. User may not be logged in.');
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    });
    return response.accessToken;
  } catch (error) {
    console.error('Token acquisition failed:', error);
    throw new Error('Token acquisition failed.');
  }
};

export const getGraphClient = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error('Access token is undefined or empty. Please provide a valid token.');
  }

  return Client.init({
    authProvider: (done) => {
      done(null, token);
    }
  });
};
