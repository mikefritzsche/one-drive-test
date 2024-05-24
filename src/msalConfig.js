// msalConfig.js

const CLIENT_ID = import.meta.env.CLIENT_ID

export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/common`,
    redirectUri: 'http://localhost:5173'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
  scopes: ["User.Read", "Files.Read"]
};
