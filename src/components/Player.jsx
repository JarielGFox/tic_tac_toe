import { useState } from "react";

function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    //aggiorniamo lo stato che ha valore di default false
    setIsEditing(true);
  };

  // dichiariamo nella variabile playerName lo span dove introdurre il nome del giocatore
  let playerName = <span className="player-name">{name}</span>;

  //valore condizionale di isEditing, ossia se isEditing è true, mostramo l'input per inserire il nome
  if (isEditing) {
    playerName = <input type="text" required />;
  }

  return (
    <li>
      <span className="player">
        {/* richiamiamo playerName in modo dinamico, dove in base al valore dello State, mostrerà il nome o l'input */}
        {playerName}
        <span className="player-symbol">{symbol}</span>
        <button className="button" onClick={handleEditClick}>
          Edit
        </button>
      </span>
    </li>
  );
}

export default Player;
