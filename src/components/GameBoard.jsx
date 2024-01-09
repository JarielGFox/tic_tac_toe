import { useState } from "react";
//settiamo il nostro game board iniziale, array multidimensionale
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
//qua dichiariamo la funzione che andremo ad esporre nel componente figlio
function GameBoard({ onSelectSquare, turns }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   const handleSelectSquare = (rowIndex, colIndex) => {
  //     //usiamo prevGameBoard per registrare lo stato precedente dell'array
  //     setGameBoard((prevGameBoard) => {
  //       //con updatedBoard accediamo alla COPIA dell'array che andiamo ad aggiornare
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       //accediamo all'interno dell'array, in base alla riga e in base alla colonna
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       //esportiamo la copia aggiornata dell'array
  //       return updatedBoard;
  //     });

  //     onSelectSquare();
  //   };

  let gameBoard = initialGameBoard;

  for (let turn of turns) {
    //destrutturo turn accedendo a square e player
    const { square, player } = turn;
    //destrutturo square e accedo a row e col
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  //onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
