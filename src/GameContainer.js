import React, { Component } from "react"
import NavBar from "./NavBar"
import ListGames from "./ListGames"
import NewGameModal from "./NewGameModal"
import EditGameModal from "./EditGameModal"

export default class GameContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			games: [],
			addingGame: false,
			gameToEdit: -1
		}
	}

	getGames = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/"
			const gamesResponse = await fetch(url, {
				credentials: "include"
			})
			const gamesJson = await gamesResponse.json()
			this.setState({
				games: gamesJson.data
			})
		} catch (err) {
			console.log(err)
		}
	}

	openNewGameModal = () => {
		this.setState({
			addingGame: true
		})
	}

	closeNewGameModal = () => {
		this.setState({
			addingGame: false
		})
	}

	closeEditGameModal = () => {
		this.setState({
			gameToEdit: -1
		})
	}

	addGame = async (game) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/"
			const addGameResponse = await fetch(url, {
				credentials: "include",
				method: "POST",
				body: JSON.stringify(game),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const addGameJson = await addGameResponse.json()
			if (addGameJson.status === 201) {
				this.setState({
					games: [addGameJson.data, ...this.state.games],
					addingGame: false
				})
			} else {
				this.setMessage(addGameJson.message)
			}
		} catch (err) {
			console.log(err)
		}
	}

	deleteGame = async (gameId) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/" + gameId
			const deleteResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			})
			if (deleteResponse.status === 200) {
				this.setState({
					games: this.state.games.filter(game => game.id !== gameId)
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	editGame = (gameIndex) => {
		this.setState({
			gameToEdit: gameIndex
		})
	}

	updateGame = async (game) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/" + game.id
			const editResponse = await fetch(url, {
				credentials: "include",
				method: "PUT",
				body: JSON.stringify(game),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (editResponse.status === 200) {
				console.log("Game updated")
			}
		} catch (err) {
			console.log(err)
		}
	}


	componentDidMount() {
		this.getGames()
	}

	render () {
		return (
			<React.Fragment>
				<NavBar
					logOut={this.props.logOut}
					role={this.props.currentUser.role}
					openNewGameModal = {this.openNewGameModal}
				/>
				<ListGames 
					games={this.state.games}
					currentUser={this.props.currentUser}
					deleteGame={this.deleteGame}
					editGame={this.editGame}
				/>
				{
					this.state.addingGame
					&&
					<NewGameModal
						closeModal={this.closeNewGameModal} 
						addGame={this.addGame}
					/>
				}
				{
					this.state.gameToEdit !== -1
					&&
					<EditGameModal
						gameToEdit={this.state.games[this.state.gameToEdit]} 
						updateGame={this.updateGame}
						closeModal={this.closeEditGameModal}
					/>
				}
			</React.Fragment>
		)
	}
}