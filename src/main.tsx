import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ApolloProvider } from '@apollo/client/react';
import { CssBaseline } from '@mui/material';

import App from './App.tsx';
import './index.css';
import { client } from './services/graphql/apollo-client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
