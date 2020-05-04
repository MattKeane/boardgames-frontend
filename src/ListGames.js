import React from "react"

export default function ListGames(props) {
	const games = props.games.map(game => {
		return(
			<div key={game.id}>
				{game.title}
			</div>
		)
	})

	return (
		<React.Fragment>
			{games}
		</React.Fragment>
	)
}