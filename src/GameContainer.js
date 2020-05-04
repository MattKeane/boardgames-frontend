import React, { Component } from "react"
import NavBar from "./NavBar"

export default class GameContainer extends Component {
	render () {
		return (
			<React.Fragment>
				<NavBar
					logOut={this.props.logOut}
				/>
				<p>Logged in as {this.props.currentUser.username}</p>
			</React.Fragment>
		)
	}
}