import React, { Component } from "react"
import { Form, Input, Button, Checkbox } from "semantic-ui-react"

export default class RegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			username: "",
			password: "",
			verifyPassword: ""
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<React.Fragment>
				<div className="register-form">
					<header>
						<h2>Register</h2>
					</header>
					<Form>
						<Form.Field>
							<Input
								inverted								
								label="Email"
								placeholder="Enter Email"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted					
								label="Username"
								placeholder="Choose Username"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted								
								type="password"
								label="Password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted								
								type="password"
								label="Re-enter Password"
								name="verifyPassword"
								value={this.state.verifyPassword}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox
								name="publisher"
								label="I am a publisher"								
							/>
						</Form.Field>
						<div>
							<Button color="purple">
								Register
							</Button>
						</div>
					</Form>
					<p onClick={this.props.toggleRegister}>Already have an account? Sign in!</p>
				</div>
			</React.Fragment>
		)
	}
}