import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];

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
  // si potrebbe usare un nuovo stato per controllare la combinazione vincente, ma non sarebbe best practice, invece usiamo il derive state
  // const [hasWinner, setHasWinner] = useState(false);

  const currentPlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (let turn of gameTurns) {
    //destrutturo turn accedendo a square e player
    const { square, player } = turn;
    //destrutturo square e accedo a row e col
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  //qua usiamo il lifting dello state derivato
  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  //funzione per resettare il gioco alla condizione iniziale, triggerata dal componente GameOver
  const handleRestart = () => {
    setGameTurns([]);
  };

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
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={currentPlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
