import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const token = localStorage.getItem('auth-token');
    return token;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('auth-token', token);
    setToken(token);
  };

  const deleteToken = () => {
    localStorage.removeItem('auth-token');
    setToken(false);
  }

  return {
    deleteToken: deleteToken,
    setToken: saveToken,
    token
  };
}

export default useToken;