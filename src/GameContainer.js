import React, { Component } from "react"

export default class GameContainer extends Component {
	render () {
		return (
			<React.Fragment>
				<p>Logged in as {this.props.currentUser.username}</p>
			</React.Fragment>
		)
	}
}