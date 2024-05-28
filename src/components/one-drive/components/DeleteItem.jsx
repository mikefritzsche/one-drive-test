// src/DeleteItem.js
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../msalConfig';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';

// eslint-disable-next-line react/prop-types
const DeleteItem = ({ itemId }) => {
  const { instance, accounts } = useMsal();
  console.log('accounts: ', accounts)
  const deleteItem = async () => {
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(instance, loginRequest);
    const client = Client.initWithMiddleware({ authProvider });

    try {
      await client.api(`/me/drive/items/${itemId}`).delete();
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleDelete = () => {
    // const itemId = prompt('Enter the ID of the item to delete:');
    if (itemId) {
      deleteItem();
    }
  };

  return (
    <div>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
};

export default DeleteItem;
