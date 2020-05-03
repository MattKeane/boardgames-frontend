import React, { Component } from "react"
import { Form, Input, Button, Checkbox } from "semantic-ui-react"

export default class RegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			username: "",
			password: "",
			verifyPassword: "",
		}
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
								value={this.props.email}
								onChange={this.props.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted					
								label="Username"
								placeholder="Choose Username"
								name="username"
								value={this.props.username}
								onChange={this.props.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted								
								type="password"
								label="Password"
								name="password"
								value={this.props.password}
								onChange={this.props.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted								
								type="password"
								label="Re-enter Password"
								name="verifyPassword"
								value={this.props.verifyPassword}
								onChange={this.props.handleChange}
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