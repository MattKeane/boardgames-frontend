import React, { useState, useEffect } from "react";
import { Modal, Header, Form, Dropdown, Input, Button } from "semantic-ui-react";

export default function NewGameModal(props) {

	const [genreOptions, setGenreOptions] = useState([]);
	const [genres, setGenres] = useState([]);
	const [title, setTitle] = useState('');
	const [minPlayers, setMinPlayers] = useState(0);
	const [maxPlayers, setMaxPlayers] = useState(0);

	useEffect(() => {
		const getGenres = async () => {
			const url = process.env.REACT_APP_API_URL + "/api/v1/genres/";
			const genreResponse = await fetch(url, {
				credentials: "include"
			});
			const genreJson = await genreResponse.json();
			const fetchedGenres = [];
			for (let i = 0; i < genreJson.data.length; i++) {
				const name = genreJson.data[i].name;
				fetchedGenres.push({
					key: name,
					text: name,
					value: name
				});
			}
			setGenreOptions(fetchedGenres);
		};
		getGenres();	
	}, []);

	const handleChange = (e, { value }) => {
		const setStateObj = {
			genres: setGenres,
			title: setTitle,
			minPlayers: setMinPlayers,
			maxPlayers: setMaxPlayers,
		};
		setStateObj[e.target.name](value);
	}

	const handleGenreChange = (e, { value }) => {
		setGenres(value);
	}
	

	const handleAddition = (e, { value }) => {
		setGenreOptions([{ text: value, value }, ...genreOptions])
	}

	const handleSubmit = () => {
		props.addGame({
			min_players: minPlayers,
			max_players: maxPlayers,
			title,
			genres,
		})
	}

	return (
		<Modal open={ true } closeIcon={ true } onClose={ props.closeModal }>
			<Header>
				<h3>Add a Game</h3>
			</Header>
			<Form onSubmit={ handleSubmit }>
				<Form.Field>
					<Input
						label="Game Title"
						type="text"
						name="title"
						value={ title }
						placeholder="Enter Game Title"
						onChange={ handleChange }
					/>
				</Form.Field>
				<Form.Field>
					<Input
						label="Minimum Number of Players"
						type="number"
						name="minPlayers"
						value={ minPlayers }
						onChange={ handleChange }
					/>
				</Form.Field>
				<Form.Field>
					<Input
						label="Maximum Number of Players"
						type="number"
						name="maxPlayers"
						value={ maxPlayers }
						onChange={ handleChange }
					/>
				</Form.Field>
				<Form.Field>
					<Dropdown
						name="genres"
						options={ genreOptions }
						placeholder="Choose Genres"
						search
						selection
						multiple
						allowAdditions
						onChange={ handleGenreChange }
						onAddItem={ handleAddition }
					/>
				</Form.Field>
				<Button>Add Game</Button>
			</Form>
		</Modal>
	)
};