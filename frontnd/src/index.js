import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AdminContextProvider } from './components/pages/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <BrowserRouter>
    <SnackbarProvider>
      <AdminContextProvider>
      <App />
      </AdminContextProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
