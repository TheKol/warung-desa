import { useState } from 'react';

export const useToken = () => {
  // internal state link to local browser user
  const [token, setTokenInternal] = useState(() => {
    // function thats compute initial state our self
    return localStorage.getItem('token');
  });

  // setting token in local storage user
  const setToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
