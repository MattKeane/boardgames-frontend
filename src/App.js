import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css"
import './App.css';
import LogInRegisterForm from "./LogInRegisterForm"
import GameContainer from "./GameContainer"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      message: "",
      currentUser: {}
    }
  }

// register 

  register = async (registrationInfo) => {
    if (registrationInfo.password === registrationInfo.verifyPassword) {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/register"
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
          this.setState({
            loggedIn: true,
            currentUser: registerJson.data
          })
        } else {
          this.setState({
            message: registerJson.message
          })
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("passwords don't match")
    }
  }

// log in

  logIn = async (logInInfo) => {
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
        this.setState({
          loggedIn: true,
          currentUser: loginJson.data
        })
      } else {
        this.setState({
          message: loginJson.message
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

// log out

  logOut = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/logout"
      const logoutResponse = await fetch(url, {
        credentials: "include"
      })
      if (logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
          currentUser: {}
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn
          ?
          <GameContainer 
            currentUser={this.state.currentUser}
            logOut={this.logOut} />
          :
          <LogInRegisterForm
            register={this.register}
            message={this.state.message}
            logIn={this.logIn} />
        }
      </div>
    );
  }
}



export default App;
