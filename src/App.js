import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css"
import './App.css';
import LogInRegisterForm from "./LogInRegisterForm"

class App extends Component {
  
  register = (registrationInfo) => {
    if (registrationInfo.password === registrationInfo.verifyPassword) {
      console.log("passwords match")
    } else {
      console.log("passwords don't match")
    }
  }

  render() {
    return (
      <div className="App">
        <LogInRegisterForm
          register={this.register} />
      </div>
    );
  }
}


export default App;
