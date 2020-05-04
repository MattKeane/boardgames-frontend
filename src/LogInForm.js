import React, { Component } from "react"
import { Form, Input, Button } from "semantic-ui-react"


export default class LogInForm extends Component {

	render() {
		return (
			<React.Fragment>
				<div className="login-form">
					<header>
						<h2>Sign In</h2>
					</header>
					<Form onSubmit={this.props.logIn}>
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
								type="password"
								label="Password"
								name="password"
								value={this.props.password}
								onChange={this.props.handleChange}
							/>
						</Form.Field>
						<div>
							<Button color="green">
								Sign In							
							</Button>
						</div>
					</Form>
					<p onClick={this.props.toggleRegister}>Need an account? Sign up!</p>
				</div>
			</React.Fragment>
		)
	}
}