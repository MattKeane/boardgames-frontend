import React, { Component } from "react"
import NavBar from "./NavBar"
import ListGames from "./ListGames"

export default class GameContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			games: []
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

	componentDidMount() {
		this.getGames()
	}

	render () {
		return (
			<React.Fragment>
				<NavBar
					logOut={this.props.logOut}
					role={this.props.currentUser.role}
				/>
				<ListGames 
					games={this.state.games}
				/>
			</React.Fragment>
		)
	}
}