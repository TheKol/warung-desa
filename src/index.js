import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import configData from './config.json';

const client = new ApolloClient({
  link: createUploadLink({
    uri: configData.GRAPHQL_URL,
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
