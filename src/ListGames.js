import React from "react"
import { Card, Button } from "semantic-ui-react"

export default function ListGames(props) {
	const games = props.games.map(game => {
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
					</Card.Description>
				</Card.Content>
				{
					game.publisher.id === props.currentUser.id
					&&
					<React.Fragment>
						<Button>
							Edit
						</Button>
						<Button>
							Delete
						</Button>
					</React.Fragment>
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