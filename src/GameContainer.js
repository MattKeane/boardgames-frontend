import React, { Component } from "react"
import NavBar from "./NavBar"
import ListGames from "./ListGames"
import NewGameModal from "./NewGameModal"

export default class GameContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			games: [],
			addingGame: false
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
				/>
				{
					this.state.addingGame
					&&
					<NewGameModal />
				}
			</React.Fragment>
		)
	}
}