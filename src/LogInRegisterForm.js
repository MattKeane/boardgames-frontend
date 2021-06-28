import React, { useState } from "react"
import LogInForm from "./LogInForm"
import RegisterForm from "./RegisterForm"

export default function LoginRegisterForm(props) {

	const [registering, setRegistering] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [role, setRole] = useState('user');

	const toggleRegistering = () => {
		// this.setState({
		// 	register: !this.state.register
		// })
		setRegistering(!registering);
	};

	const togglePublisher = () => {
		const newRole = role === 'user' ? 'publisher' : 'user';
		setRole(newRole);
	};

	const handleChange = (e) => {
		const setStateObj = {
			register: setRegistering,
			email: setEmail,
			password: setPassword,
			verifyPassword: setVerifyPassword,
			role: setRole,
			username: setUsername,
		};
		setStateObj[e.target.name](e.target.value);
	};

	const register = () => {
		props.register({
			username,
			email,
			password,
			verifyPassword,
			role
		});
	};

	const logIn = () => {
		props.logIn({
			username,
			email,
			password,
			verifyPassword,
		})
	};

	return (
		<React.Fragment>
			{
				registering 
				?
				<RegisterForm 
					toggleRegister={ toggleRegistering }
					username={ username }
					email={ email }
					password={ password }
					verifyPassword={ verifyPassword }
					handleChange={ handleChange }
					handleCheck={ togglePublisher }
					register={ register }
					message={ props.message }
					onCheck={ togglePublisher }
				/>
				:
				<LogInForm 
					toggleRegister={ toggleRegistering }
					email={ email }
					password={ password }
					handleChange={ handleChange }
					message={ props.message }
					logIn={ logIn }
				/>
			}
		</React.Fragment>
	)

}