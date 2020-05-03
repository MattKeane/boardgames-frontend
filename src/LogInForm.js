import React, { Component } from "react"
import { Form, Input, Button } from "semantic-ui-react"


export default class LogInRegisterForm extends Component {

	render() {
		return (
			<React.Fragment>
				<div className="login-form">
					<header>
						<h2>Sign In</h2>
					</header>
					<Form>
						<Input
							inverted
							label="Email"
							placeholder="Enter Email"
							name="email"
						/>
						<Input
							inverted
							type="password"
							label="Password"
							name="password"
						/>
						<div>
							<Button color="green">
								Sign In							
							</Button>
						</div>
					</Form>
				</div>
			</React.Fragment>
		)
	}
}