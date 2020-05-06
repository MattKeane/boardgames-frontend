import React from "react"
import { Card, Button, Label, Icon } from "semantic-ui-react"

export default function ListGames(props) {

	const games = props.games.map( (game, i) => {

		const genres = game.genres.map( genre => {
			return (
				<Label key={genre.id} as="a" tag>{genre.name}</Label>
			)
		})

		const numberOfFaves = game.favorites.length

		const likers = game.favorites.map( (favorite) => favorite.id)

		let faveButtonColor = "grey"
		if (likers.includes(props.currentUser.id)) {
			faveButtonColor = "red"
		}

		const handleFaveClick = () => {
			if (likers.includes(props.currentUser.id)) {
				props.deleteFave(game.id, i)
			} else {
				props.addFave(game.id, i)
			}
		}


		return (
			<Card key={game.id} color="purple" inverted>
				<Card.Content>
					<Card.Header>
						{game.title}
					</Card.Header>
					<Card.Meta>
						{game.publisher.username}
					</Card.Meta>
					<Card.Description>
						{game.min_players}-{game.max_players} players
						<p>
							{genres}
						</p>
					</Card.Description>
				</Card.Content>
				{
					game.publisher.id === props.currentUser.id
					&&
					<Button.Group>
						<Button
							onClick={ () => props.editGame(i)}>
							Edit
						</Button>
						<Button
							onClick={ () => props.deleteGame(game.id)}>
							Delete
						</Button>
					</Button.Group>
				}
				{
					props.currentUser.role === "user"
					&&
					<Button 
						as="div" 
						labelPosition="right"
						onClick={handleFaveClick}>
						<Button color={faveButtonColor}>
							<Icon name="heart" />
							Fave
						</Button>
						<Label as="a" basic color={faveButtonColor} pointing="left">
							{numberOfFaves}
						</Label>
					</Button>
				}

			</Card>
		)
	})

	return (
		<Card.Group>
			{games}
		</Card.Group>
	)
}