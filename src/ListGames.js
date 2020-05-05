import React from "react"
import { Card, Button, Label, Segment, Icon } from "semantic-ui-react"

export default function ListGames(props) {

	const games = props.games.map( (game, i) => {

		const genres = game.genres.map( genre => {
			return (
				<Label key={genre.id} as="a" tag>{genre.name}</Label>
			)
		})

		return(
			<Card key={game.id}>
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
					<React.Fragment>
						<Button
							onClick={ () => props.editGame(i)}>
							Edit
						</Button>
						<Button
							onClick={ () => props.deleteGame(game.id)}>
							Delete
						</Button>
					</React.Fragment>
				}
				{
					props.currentUser.role === "user"
					&&
					<Button 
						as="div" 
						labelPosition="right"
						onClick={ () => props.addFave(game.id)}>
						<Button color="red">
							<Icon name="heart" />
							Fave
						</Button>
						<Label as="a" basic color="red" pointing="left">
							0
						</Label>
					</Button>
				}

			</Card>
		)
	})

	return (
		<React.Fragment>
			{games}
		</React.Fragment>
	)
}