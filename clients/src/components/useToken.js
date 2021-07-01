import { useState } from 'react';
import {getCookie} from './function/getCookie'
export default function useToken() {
  const getToken = () => {
    return getCookie('access_token')
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    document.cookie = `access_token=${userToken};SameSite=None;Secure;`
    setToken(getCookie('access_token'));
  };
  return {
    setToken: saveToken,
    token
  }
}