import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css"
import './App.css';
import LogInRegisterForm from "./LogInRegisterForm"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      message: ""
    }
  }
  
  register = async (registrationInfo) => {
    if (registrationInfo.password === registrationInfo.verifyPassword) {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/register"
      const requestBody = registrationInfo
      try {
        if (requestBody.publisher) {
          requestBody.role = "publisher"
        } else {
          requestBody.role = "user"
        }
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
            loggedIn: true
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

  logIn = async (logInInfo) => {
    console.log("Log in")
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn
          ?
          <p>Logged In</p>
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
