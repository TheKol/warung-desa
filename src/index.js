import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const BASE_URL = window.BASE_URL;
const client = new ApolloClient({
  link: createUploadLink({
    uri: `${BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
