import Login_Page from './components/login.page'
import React from 'react';
import MainPage from './components/main.page'
import './App.css'
import useToken from './components/useToken';
function App() {
  const { token, setToken } = useToken();
  if (token){
    return (
      <MainPage></MainPage>
    )
  }
  else 
    return (
      <div className="App">
          <Login_Page setToken={setToken} />
      </div>
    );
}

export default App;
