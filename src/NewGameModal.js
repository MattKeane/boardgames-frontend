import React, { Component } from "react"
import { Modal } from "semantic-ui-react"

export default class NewGameModal extends Component {

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal})>
				<Header>
					<h3>Add a Game</h3>
				</Header>
			</Modal>
	}
}