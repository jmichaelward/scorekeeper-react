import React, { useState } from 'react'
import PlayersList from '../PlayersList'
import { saveGameState } from '../../App'
import ScoreAdjustmentForm from '../ScoreAdjustmentForm'

const GameInProgress = props => {
  const [activePlayer, setActivePlayer] = useState(props.activePlayer)
  const [playerCount] = useState(props.playerCount)
  const [players] = useState(props.players)

  const getPlayerId = event => {
    const player = event.target.closest('.player')

    return null === player ? activePlayer : parseInt(player.getAttribute('data-player'), 10)
  }

  const determineActivePlayer = event => {
    setActivePlayer(getPlayerId(event))

    saveGameState({
      players,
      playerCount,
      activePlayer
    })
  }

  const handleScoreUpdate = event => {
    event.preventDefault()

    const form = event.target
    const score = parseInt(form.querySelector('#scoreInput').value, 10)

    setPlayerScore(activePlayer, score)
    setNextActivePlayer()

    form.reset()
  }

  const setPlayerScore = (player, score) => {
    players[ activePlayer ].score += isNaN(score) ? 0 : score
  }

  const setNextActivePlayer = () => {
    const nextActivePlayer = activePlayer < ( props.playerCount - 1 ) ? activePlayer + 1 : 0
    setActivePlayer(nextActivePlayer)

    saveGameState({
      players,
      playerCount,
      activePlayer
    })
  }

  return (
    <div className="scorekeeper-game" onClick={determineActivePlayer}>
      <h2>Update Player Score</h2>
      <ScoreAdjustmentForm handler={handleScoreUpdate}/>
      <PlayersList
        id="players-list"
        players={players}
        activePlayer={activePlayer}
      />
    </div>
  )
}

export default GameInProgress
