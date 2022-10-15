import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import "./style.css"

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
