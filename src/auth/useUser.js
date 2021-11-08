import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
  const [token] = useToken();

  // get payload from token
  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    // check token
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  // when token change update the user
  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);
  return user;
};
