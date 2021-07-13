import { useState,useEffect } from 'react';
import {getCookie} from './function/getCookie'
const electron = window.require("electron")
export default function useToken() {

  const [token, setToken] = useState();

  useEffect(()=>{

    const getToken = async () => {
      var acesstoken =  await getCookie('access_token')
      setToken(acesstoken)
    };
    getToken()

  },[])

  

  const saveToken = userToken => {
    const cookieJar = electron.remote.session.defaultSession.cookies;
    var cookie = {url:'http:localhost',name : 'access_token' , value : userToken }
    cookieJar.set(cookie)
    setToken(getCookie('access_token'));
  };
  return {
    setToken: saveToken,
    token
  }
}