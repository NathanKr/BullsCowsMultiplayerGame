import React, { Component } from "react";

class Game extends Component {
  state = { bulls: 0, cows: 0, gameHasStarted: true };

  render() {
    return (
      <>
        <h2>Game</h2>
        {!this.state.gameHasStarted ? (
          <button>Start game</button>
        ) : (
          <>
            <input placeholder="insert word" />
            <button>Create your word</button>
            <br />
            <input placeholder="insert word" />
            <input placeholder="insert opponent" />
            <button>Guess your opponent word</button>
            <p>{`bulls : ${this.state.bulls} , cows : ${this.state.cows}`}</p>
          </>
        )}
      </>
    );
  }
}

export default Game;
