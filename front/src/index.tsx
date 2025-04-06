// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Use ! to assert that the element exists
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
