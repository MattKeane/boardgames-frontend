import React from "react"

export default func ListGames(props) {
	const games = props.games.map(games => {
		return(
			<div>
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