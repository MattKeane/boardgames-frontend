import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css"
import './App.css';
import LogInRegisterForm from "./LogInRegisterForm"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }
  
  register = async (registrationInfo) => {
    if (registrationInfo.password === registrationInfo.verifyPassword) {
      const url = process.env.REACT_APP_API_URL + "/api/v1/accounts/register"
      try {
        const requestBody = registrationInfo
        if (requestBody.publisher) {
          requestBody.role = "publisher"
        } else {
          requestBody.role = "user"
        }
        console.log(JSON.stringify(requestBody))
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
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("passwords don't match")
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn
          ?
          <p>Logged In</p>
          :
          <LogInRegisterForm
            register={this.register} />
        }
      </div>
    );
  }
}


export default App;
