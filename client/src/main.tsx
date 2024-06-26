import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rootElement = document.getElementById('root') || null;
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
