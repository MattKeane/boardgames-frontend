import React from "react"
import { Menu } from "semantic-ui-react"

export default function NavBar(props) {
	return (
		<div className="nav-bar">
			<Menu pointing secondary color="purple">
				{
					props.role === "publisher"
					&&
					<Menu.Item
						name="Add Game"
						onClick={ props.openNewGameModal }
					/>
				}
				<Menu.Menu position="right">
					<Menu.Item
						name="Logout"
						onClick={ props.logOut }
					/>
				</Menu.Menu>
			</Menu>
		</div>
	)
}