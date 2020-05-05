import React, { Component } from "react"
import { Modal, Header, Form, Input, Dropdown, Button } from "semantic-ui-react"

export default class EditDogModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: props.gameToEdit.title,
			min_players: props.gameToEdit.min_players,
			max_players: props.gameToEdit.max_players,
			genres: props.gameToEdit.genres,
			id: props.gameToEdit.id,
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

	handleChange = (e, { value }) => {
		this.setState({
			[e.target.name]: value
		})
	}

	handleAddition = (e, { value }) => {
		this.setState({
			genreOptions: [{text: value, value }, ...this.state.genreOptions]
		})
	}

	componentDidMount() {
		this.getGenres()
	}

	handleSubmit = () => {
		this.props.updateGame(this.state)
	}

	render() {
		return (
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Header>
					<h3>Edit Game</h3>
				</Header>
				<Header>
					<h3>Add a Game</h3>
				</Header>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<Input
							label="Game Title"
							type="text"
							name="title"
							value={this.state.title}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							label="Minimum Number of Players"
							type="number"
							name="min_players"
							value={this.state.min_players}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							label="Maximum Number of Players"
							type="number"
							name="max_players"
							value={this.state.max_players}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<Dropdown
							name="genres"
							options={this.state.genreOptions}
							search
							selection
							multiple
							allowAdditions
							onChange={this.handleChange}
							onAddItem={this.handleAddition}
						/>
					</Form.Field>
					<Button>Update Game</Button>
				</Form>
			</Modal>
		)
	}
}