import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import ListGames from "./ListGames"
import NewGameModal from "./NewGameModal"
import EditGameModal from "./EditGameModal"

export default function GameContainer(props) {

	const [games, setGames] = useState([]);
	const [addingGame, setAddingGame] = useState(false);
	const [gameToEdit, setGameToEdit] = useState(-1);

	useEffect(() => {
		const getGames = async () => {
			try {
				const url = process.env.REACT_APP_API_URL + "/api/v1/games/";
				const gamesResponse = await fetch(url, {
					credentials: "include"
				});
				const gamesJson = await gamesResponse.json();
				setGames(gamesJson.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGames();
	}, []);

	const addFave = async (gameId, gameIndex) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/favorite/" + gameId;
			const addFaveResponse = await fetch(url, {
				credentials: "include",
				method: "POST"
			});
			if (addFaveResponse.status === 200) {
				const gamesCopy = [...games];
				gamesCopy[gameIndex].favorites.push(props.currentUser);
				setGames(gamesCopy);
			} else {
				const addFaveJson = await addFaveResponse.json();
				console.log(addFaveJson.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteFave = async (gameId, gameIndex) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/favorite/" + gameId;
			const deleteFaveResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			});
			if (deleteFaveResponse.status === 200) {
				const gamesCopy = [...games];
				gamesCopy[gameIndex].favorites = games[gameIndex].favorites.filter(favorite => favorite.id !== this.props.currentUser.id);
				setGames(gamesCopy);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const openNewGameModal = () => {
		setAddingGame(true);
	};

	const closeNewGameModal = () => {
		setAddingGame(false);
	};

	const closeEditGameModal = () => {
		setGameToEdit(-1);
	};

	const addGame = async (game) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/";
			const addGameResponse = await fetch(url, {
				credentials: "include",
				method: "POST",
				body: JSON.stringify(game),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const addGameJson = await addGameResponse.json();
			if (addGameJson.status === 201) {
				setGames([addGameJson.data, ...games]);
				setAddingGame(false);
			} else {
				props.setMessage(addGameJson.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteGame = async (gameId) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/" + gameId;
			const deleteResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			});
			if (deleteResponse.status === 200) {
				const updatedGames = games.filter(game => game.id !== gameId);
				setGames(updatedGames);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const editGame = (gameIndex) => {
		setGameToEdit(gameIndex);
	};

	const updateGame = async (game) => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/games/" + game.id;
			const editResponse = await fetch(url, {
				credentials: "include",
				method: "PUT",
				body: JSON.stringify(game),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (editResponse.status === 200) {
				const editJson = await editResponse.json()
				const gamesCopy = [...games];
				gamesCopy.splice(gameToEdit, 1, editJson.data);
				setGames(gamesCopy);
				setGameToEdit(-1);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<React.Fragment>
			<NavBar
				logOut={ props.logOut }
				role={ props.currentUser.role }
				openNewGameModal = { openNewGameModal }
			/>
			<ListGames 
				games={ games }
				currentUser={ props.currentUser }
				deleteGame={ deleteGame }
				editGame={ editGame }
				addFave={ addFave }
				deleteFave={ deleteFave }
			/>
			{
				addingGame
				&&
				<NewGameModal
					closeModal={ closeNewGameModal } 
					addGame={ addGame }
				/>
			}
			{
				gameToEdit !== -1
				&&
				<EditGameModal
					gameToEdit={ games[gameToEdit] } 
					updateGame={ updateGame }
					closeModal={ closeEditGameModal }
				/>
			}
		</React.Fragment>
	)
}