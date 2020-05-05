import React, { Component } from "react"
import { Modal, Header } from "semantic-ui-react"

export default class EditDogModal extends Component {

	render() {
		return (
			<Modal open={true} onClose={this.props.closeModal}>
				<Header>
					<h3>Edit Game</h3>
				</Header>
			</Modal>
		)
	}
}