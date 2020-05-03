import React, { Component } from "react"
import { Form, Input, Button, Checkbox } from "semantic-ui-react"

export default class RegisterForm extends Component {
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
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted
								fluid
								label="Username"
								placeholder="Choose Username"
								name="username"
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted
								fluid
								type="password"
								label="Password"
								name="password"
							/>
						</Form.Field>
						<Form.Field>
							<Input
								inverted
								fluid
								type="password"
								label="Re-enter Password"
								name="verify-password"
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox
								name="publisher"
								label="I am a publisher"
								color="white"
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