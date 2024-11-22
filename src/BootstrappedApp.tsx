import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import App from './App'; // Assuming App is your main component

// You shoudd wrap the App component with the QueryClientProvider
// You can also use ReactQueryDevtools to debug the queries

export const BootstrappedApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
