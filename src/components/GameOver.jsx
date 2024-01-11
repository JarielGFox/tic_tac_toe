function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner ? <p>{winner} won!</p> : <p>Tie!</p>}
      <p>
        <button onClick={onRestart}>Play again</button>
      </p>
    </div>
  );
}

export default GameOver;
