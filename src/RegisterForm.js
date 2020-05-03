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
						<Input
							inverted
							fluid
							label="Email"
							placeholder="Enter Email"
							name="email"
						/>
						<Input
							inverted
							fluid
							label="Username"
							placeholder="Choose Username"
							name="username"
						/>
						<Input
							inverted
							fluid
							type="password"
							label="Password"
							name="password"
						/>
						<Input
							inverted
							fluid
							type="password"
							label="Re-enter Password"
							name="verify-password"
						/>
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
				</div>
			</React.Fragment>
		)
	}
}