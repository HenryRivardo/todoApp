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
