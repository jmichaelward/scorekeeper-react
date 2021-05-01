import React from 'react'
import PlayersList from '../PlayersList'
import ScoreAdjustmentForm from '../ScoreAdjustmentForm'

const GameInProgress = props => {
  const { game } = props;

  const getPlayerId = event => {
    const player = event.target.closest('.player')

    return null === player ? game.activePlayer : parseInt(player.getAttribute('data-player'), 10)
  }

  /**
   * Determine the active player to highlight.
   *
   * @param event
   */
  const determineActivePlayer = event => {
    game.activePlayer = getPlayerId(event);
    props.update(game);
  }

  /**
   * Process the form submission.
   *
   * @param event
   */
  const handleScoreUpdate = event => {
    event.preventDefault()

    const form = event.target
    const score = parseInt(form.querySelector('#scoreInput').value, 10)

    setPlayerScore(game.activePlayer, score)
    setNextActivePlayer()

    form.reset()
  }

  /**
   * Set the score for the player.
   *
   * @param player
   * @param score
   */
  const setPlayerScore = (player, score) => {
    game.players[ game.activePlayer ].score += isNaN(score) ? 0 : score
  }

  /**
   * Update the UI to the next active player.
   */
  const setNextActivePlayer = () => {
    game.activePlayer = game.activePlayer < ( game.playerCount - 1 ) ? game.activePlayer + 1 : 0
    props.update(game);
  }

  return (
    <div className="scorekeeper-game" onClick={determineActivePlayer}>
      <h2>Update Player Score</h2>
      <ScoreAdjustmentForm handler={handleScoreUpdate}/>
      <PlayersList
        id="players-list"
        players={game.players}
        activePlayer={game.activePlayer}
      />
    </div>
  )
}

export default GameInProgress
