import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { Client } from '@microsoft/microsoft-graph-client';
import { msalInstance } from "../msalInstance.js";


const OneDriveFileUpload = () => {
  const [account, setAccount] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      msalInstance.loginPopup().then((response) => {
        setAccount(response.account);
      });
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select or drop a file first.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });

        const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
          account: msalInstance.getAllAccounts()[0],
          scopes: ['Files.ReadWrite'],
        });

        const graphClient = Client.initWithMiddleware({ authProvider });

        await graphClient.api(`/me/drive/root:/${file.name}:/content`).put(blob);
        setMessage('File uploaded successfully.');
      };
      reader.onerror = (error) => {
        setMessage('Error reading file.');
        setUploading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Upload File to OneDrive</h1>
      <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle(isDragActive)}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

const dropzoneStyle = (isDragActive) => ({
  border: '2px dashed #0078d4',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
  cursor: 'pointer',
});

export default OneDriveFileUpload;

