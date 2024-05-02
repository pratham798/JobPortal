import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './store/provider';

import './index.css';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
