import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css"
import './App.css';
import LogInRegisterForm from "./LogInRegisterForm"

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <LogInRegisterForm />
      </div>
    );
  }
}


export default App;
