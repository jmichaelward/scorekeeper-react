import React from 'react'
import Player from '../Player'
import './PlayersList.scss'

const PlayersList = (props) => {
  const { players, activePlayer } = props;

  const isActivePlayer = (activePlayer, key) => {
    return activePlayer === key
  }

  const mapPlayersToList = () => {
    return players.map((player, index) => {
        const { id, name, score } = player

        return (
          <Player
            key={index}
            playerNumber={id}
            name={name}
            score={score}
            isActive={isActivePlayer(activePlayer, index)}
          />
        )
      }
    )
  }

  return (
    <section className="players-list-section">
      <header className="section__hdr">
        <h2 className="h2 section__hd">Player Scores</h2>
      </header>
      <ul className="players-list">
        {mapPlayersToList()}
      </ul>
    </section>
  )
}

export default PlayersList
