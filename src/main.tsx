// src/main.tsx
import '@/scss/globals.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BootstrappedApp } from './BootstrappedApp';
// src/main.tsx
import './scss/globals.scss';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <StrictMode>
    <BootstrappedApp />
  </StrictMode>
);
console.log('Base URL (from App):', import.meta.env.VITE_BASE_API_URL);
console.log('API Key (from App):', import.meta.env.VITE_PRIVATE_API_KEY);
