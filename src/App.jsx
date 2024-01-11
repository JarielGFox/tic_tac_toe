import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

//funzione helper per calcolare il giocatore attuale
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns[0] && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

function App() {
  //const [activePlayer, setActivePlayer] = useState("X");

  //stato per il log, all'inizio sarà un array vuoto
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    //funzione riguardante i turni che vogliamo far apparire nei log
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          //si poteva usare activePlayer, ma così non avremmo avuto la sicurezza di avere il valore aggiornato correttamente
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={currentPlayer === "X"}
            initialName="Player 1"
            symbol="X"
          />
          <Player
            isActive={currentPlayer === "O"}
            initialName="Player 2"
            symbol="O"
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={currentPlayer}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
