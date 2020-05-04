import React, { Component } from "react"
import { Menu } from "semantic-ui-react"

export default class NavBar extends Component {

	render() {
		return (
			<div className="nav-bar">
				<Menu pointing secondary>
					<Menu.Menu position="right">
						<Menu.Item
							name="Logout"
							onClick={this.props.logOut}
						/>
					</Menu.Menu>
				</Menu>
			</div>
		)
	}
}