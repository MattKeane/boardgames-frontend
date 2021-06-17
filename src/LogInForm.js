import React from "react"
import { Form, Input, Button } from "semantic-ui-react"


export default function LogInForm(props) {

	return (
		<React.Fragment>
			<div className="login-form">
				<header>
					<h2>Sign In</h2>
				</header>
				<div>{ props.message }</div>
				<Form onSubmit={ props.logIn }>
					<Form.Field>
						<Input
							inverted								
							label="Email"
							placeholder="Enter Email"
							name="email"
							value={ props.email }
							onChange={ props.handleChange }
						/>
					</Form.Field>
					<Form.Field>
						<Input
							inverted
							type="password"
							label="Password"
							name="password"
							value={ props.password }
							onChange={ props.handleChange }
						/>
					</Form.Field>
					<div>
						<Button color="green">
							Sign In							
						</Button>
					</div>
				</Form>
				<p onClick={ props.toggleRegister }>Need an account? Sign up!</p>
			</div>
		</React.Fragment>
	)
}