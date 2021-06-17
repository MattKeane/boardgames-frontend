import React, { useState, useEffect } from 'react';
import "semantic-ui-css/semantic.min.css"
import './App.css';
import LogInRegisterForm from "./LogInRegisterForm"
import GameContainer from "./GameContainer"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const register = async (registrationInfo) => {
    if (registrationInfo.password === registrationInfo.verifyPassword) {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/register"
      console.log(url)
      const requestBody = registrationInfo
      try {
        const registerResponse = await fetch(url, {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const registerJson =  await registerResponse.json()
        if (registerJson.status === 201) {
          setLoggedIn(true);
          setCurrentUser(registerJson.data);
        } else {
          setMessage(registerJson.message);
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("passwords don't match")
    }
  }

// log in

   const logIn = async (logInInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/login"
      const loginResponse = await fetch(url, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(logInInfo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const loginJson = await loginResponse.json()
      if (loginResponse.status === 200) {
        setLoggedIn(true);
        setCurrentUser(loginJson.data);
      } else {
        setMessage(loginJson.message);
      }
    } catch(err) {
      console.log(err)
    }
  }

// log out

  const logOut = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/logout"
      const logoutResponse = await fetch(url, {
        credentials: "include"
      })
      if (logoutResponse.status === 200) {
        setLoggedIn(false);
        setCurrentUser({});
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const checkLogIn = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/logged_in_user"
        const checkLogInResponse = await fetch(url, {
          credentials: "include"
        })
        if (checkLogInResponse.status === 200) {
          const checkLogInJson = await checkLogInResponse.json()
          setLoggedIn(true);
          setCurrentUser(checkLogInJson.data);
        }
      } catch (err) {
        console.log(err)
      }
    };
    checkLogIn();
  }, []);

  return (
    <div className="App">
      {loggedIn
        ?
        <GameContainer 
          currentUser={currentUser}
          logOut={logOut}
          setMessage={setMessage} />
        :
        <LogInRegisterForm
          register={register}
          message={message}
          logIn={logIn} />
      }
    </div>
  );

}



export default App;