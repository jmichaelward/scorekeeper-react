import React from "react";
import Player from "./Player";
import "../styles/PlayersList.css";

const isActivePlayer = (activePlayer, key) => {
    return activePlayer === key;
};

const PlayersList = (props) => {
    const {
        players,
        activePlayer
    } = props;

    console.log(props);

    return (
        <section className="players-list-section">
            <header className="section__hdr">
                <h2 className="h2 section__hd">Player Scores</h2>
            </header>
            <ul className="players-list">
                {players.map((player, index) => (
                    <Player
                        key={index}
                        playerNumber={player.id}
                        name={player.name}
                        score={player.score}
                        isActive={isActivePlayer(activePlayer, index)}
                    />
                ))}
            </ul>
        </section>
    );
};

export default PlayersList;
