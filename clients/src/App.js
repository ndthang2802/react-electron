import Login_Page from './components/login.page'
import React, { useState,useEffect } from 'react';
import MainPage from './components/main.page'
import './App.css'
function App() {
  const [loginStatus,setLoginStatus] = useState(false)
  
  useEffect( ()=>{
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/api/token/',{   // server_test
              method: 'GET',
              credentials:'include'
          })
      if (response.status === 200){
        setLoginStatus(true)
      }
    }
    fetchData()
  },[loginStatus])


  if (loginStatus){
    return (
      <MainPage></MainPage>
    )
  }

  else 
    return (
      <div className="App">
      
          <Login_Page setLoginStatus={setLoginStatus}>

          </Login_Page>
    
      </div>
    );
}

export default App;
