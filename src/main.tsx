import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles.css';

// Ensure we're using createRoot with React 18
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
