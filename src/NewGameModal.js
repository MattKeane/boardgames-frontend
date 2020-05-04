import React, { Component } from "react"
import { Modal, Header, Form, Dropdown } from "semantic-ui-react"

export default class NewGameModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			genreOptions: []
		}
	}

	getGenres = async () => {
		const url = process.env.REACT_APP_API_URL + "/api/v1/genres/"
		const genreResponse = await fetch(url, {
			credentials: "include"
		})
		const genreJson = await genreResponse.json()
		const genres = []
		for (let i = 0; i < genreJson.data.length; i++) {
			const name = genreJson.data[i].name
			genres.push({
				key: name,
				text: name,
				value: name
			})
		}
		this.setState({
			genreOptions: genres
		})
	}

	componentDidMount() {
		this.getGenres()
	}

	render() {
		return (
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Header>
					<h3>Add a Game</h3>
				</Header>
				<Form>
					<Dropdown
						options={this.state.genreOptions}
					/>
				</Form>
			</Modal>
		)
	}
}