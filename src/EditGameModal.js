import React, { useState, useEffect } from "react";
import { Modal, Header, Form, Input, Dropdown, Button } from "semantic-ui-react";

export default function EditDogModal(props) {

	const [title, setTitle] = useState(props.gameToEdit.title);
	const [minPlayers, setMinPlayers] = useState(props.gameToEdit.min_players);
	const [maxPlayers, setMaxPlayers] = useState(props.gameToEdit.max_players);
	const [genres, setGenres] = useState(props.gameToEdit.genres);
	const [genreOptions, setGenreOptions] = useState([]);

	// effect to get pre-existing genres

	useEffect(() => {
		const getGenres = async () => {
			const url = process.env.REACT_APP_API_URL + "/api/v1/genres/";
			const genreResponse = await fetch(url, {
				credentials: "include"
			});
			const genreJson = await genreResponse.json();
			const fetchedGenres = [];
			for (let i = 0; i < genreJson.data.length; i++) {
				const name = genreJson.data[i].name
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
			title: setTitle,
			minPlayers: setMinPlayers,
			maxPlayers: setMaxPlayers,
			genres: setGenres,
		};
		setStateObj[e.target.name](value);
	};

	const handleAddition = (e, { value }) => {
		setGenreOptions([{ test: value, value }, ...genreOptions])
	};

	const handleGenreChange = (e, { value }) => {
		setGenres(value);
	};

	const handleSubmit = () => {
		props.updateGame({
			min_players: minPlayers,
			max_players: maxPlayers,
			id: props.gameToEdit.id,
			title,
			genres, 
		});
	};

		return (
		<Modal open={ true } closeIcon={ true } onClose={ props.closeModal }>
			<Header>
				<h3>Edit Game</h3>
			</Header>
			<Form onSubmit={ handleSubmit }>
				<Form.Field>
					<Input
						label="Game Title"
						type="text"
						name="title"
						value={ title }
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
						search
						selection
						multiple
						allowAdditions
						onChange={ handleGenreChange }
						onAddItem={ handleAddition }
					/>
				</Form.Field>
				<Button>Update Game</Button>
			</Form>
		</Modal>
	)
};