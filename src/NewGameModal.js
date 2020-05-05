import React, { Component } from "react"
import { Modal, Header, Form, Dropdown, Input, Button } from "semantic-ui-react"

export default class NewGameModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			genreOptions: [],
			genres: [],
			title: "",
			min_players: null,
			max_players: null
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

	handleChange = (e, { value }) => {
		this.setState({
			[e.target.name]: value
		})
	}

	handleGenreChange = (e, { value }) => {
		this.setState({
			genres: value
		})
	}
	

	handleAddition = (e, { value }) => {
		this.setState({
			genreOptions: [{text: value, value }, ...this.state.genreOptions]
		})
	}

	handleSubmit = () => {
		this.props.addGame(this.state)
	}

	render() {
		return (
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
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
							placeholder="Enter Game Title"
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
							placeholder="Choose Genres"
							search
							selection
							multiple
							allowAdditions
							onChange={this.handleGenreChange}
							onAddItem={this.handleAddition}
						/>
					</Form.Field>
					<Button>Add Game</Button>
				</Form>
			</Modal>
		)
	}
}