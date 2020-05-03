import React, { Component } from "react"
import LogInForm from "./LogInForm"
import RegisterForm from "./RegisterForm"

export default class LogInRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			register: false,
			username: "",
			email: "",
			password: "",
			verifyPassword: "",
			publisher: false
		}
	}

	toggleRegister = () => {
		this.setState({
			register: !this.state.register
		})
	}

	togglePublisher = () => {
		this.setState({
			publisher: !this.state.publisher
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	register = () => {
		console.log(this.state)
	}

	render() {
		return (
			<React.Fragment>
				{
					this.state.register 
						?
						<RegisterForm 
							toggleRegister={this.toggleRegister}
							username={this.state.username}
							email={this.state.email}
							password={this.state.password}
							verifyPassword={this.state.verifyPassword}
							handleChange={this.handleChange}
							handleCheck={this.togglePublisher}
							register={this.register}
						/>
						:
						<LogInForm 
							toggleRegister={this.toggleRegister}
							email={this.state.email}
							password={this.state.password}
							handleChange={this.handleChange}
						/>
				}
			</React.Fragment>
		)
	}
}