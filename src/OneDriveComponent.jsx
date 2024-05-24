// OneDriveComponent.js
import React, { useEffect, useState } from 'react';
import { getGraphClient } from './graphClient';
import { useAuth } from './AuthProvider.jsx';

const OneDriveComponent = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const client = await getGraphClient();
        const response = await client.api('/me/drive/root/children').get();
        setFiles(response.value);
      } catch (error) {
        console.error('Error fetching files:', error);
        setError(error.message);
      }
    };

    if (isAuthenticated) {
      fetchFiles();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Please log in to view your OneDrive files</h1>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>My OneDrive Files</h1>
      <button onClick={logout}>Logout</button>
      {error ? <p>Error: {error}</p> : null}
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name} {<a href={file.webUrl} target="_blank" rel="noopener noreferrer">Link</a>}</li>
        ))}
      </ul>
    </div>
  );
};

export default OneDriveComponent;
