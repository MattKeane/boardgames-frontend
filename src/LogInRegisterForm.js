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
			role: "user"
		}
	}

	toggleRegister = () => {
		this.setState({
			register: !this.state.register
		})
	}

	togglePublisher = () => {
		if (this.state.role === "user") {
			this.setState({
				role: "publisher"
			})
		} else {
			this.setState({
				role: "user"
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	register = () => {
		this.props.register(this.state)
	}

	logIn = () => {
		this.props.logIn(this.state)
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
							message={this.props.message}
							onCheck={this.togglePublisher}
						/>
						:
						<LogInForm 
							toggleRegister={this.toggleRegister}
							email={this.state.email}
							password={this.state.password}
							handleChange={this.handleChange}
							message={this.props.message}
							logIn={this.logIn}
						/>
				}
			</React.Fragment>
		)
	}
}