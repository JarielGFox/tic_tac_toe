import { useState } from "react";
//settiamo il nostro game board iniziale, array multidimensionale

//qua dichiariamo la funzione che andremo ad esporre nel componente figlio
function GameBoard({ onSelectSquare, board }) {
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

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled={playerSymbol !== null}
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
