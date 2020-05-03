import React, { Component } from "react"
import LogInForm from "./LogInForm"
import RegisterForm from "./RegisterForm"

export default class LogInRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			register: false
		}
	}

	toggleRegister = () => {
		this.setState({
			register: !this.state.register
		})
	}

	render() {
		return (
			<React.Fragment>
				{
					this.state.register 
						?
						<RegisterForm toggleRegister={this.toggleRegister}/>
						:
						<LogInForm toggleRegister={this.toggleRegister}/>
				}
			</React.Fragment>
		)
	}
}