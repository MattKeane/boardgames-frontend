import React from "react"
import { Form, Input, Button, Checkbox } from "semantic-ui-react"

// export default class RegisterForm extends Component {
export default function RegisterForm(props) {

	return (
		<React.Fragment>
			<div className="register-form">
				<header>
					<h2>Register</h2>
				</header>
				<div>{ props.message }</div>
				<Form onSubmit={ props.register }>
					<Form.Field>
						<Input
							inverted
							type="email"								
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
							label="Username"
							placeholder="Choose Username"
							name="username"
							value={ props.username }
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
					<Form.Field>
						<Input
							inverted								
							type="password"
							label="Re-enter Password"
							name="verifyPassword"
							value={ props.verifyPassword }
							onChange={ props.handleChange }
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							name="publisher"
							label="I am a publisher"
							onChange={ props.onCheck }						
						/>
					</Form.Field>
					<div>
						<Button color="purple">
							Register
						</Button>
					</div>
				</Form>
				<p onClick={ props.toggleRegister }>Already have an account? Sign in!</p>
			</div>
		</React.Fragment>
	)
}