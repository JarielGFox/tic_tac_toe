import { useState } from "react";

function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleChange = (event) => {
    //event è l'oggetto che vogliamo emettere
    //accediamo alla proprietà target.value, dato che event è un oggetto
    //in questo modo accediamo al valore che l'utente sta digitando in input in quel momento
    setPlayerName(event.target.value);
  };

  const handleEditClick = () => {
    //serve per cambiare lo stato in maniera dinamica ed in tempo reale
    setIsEditing((editing) => !editing);
  };

  // dichiariamo nella variabile playerName lo span dove introdurre il nome del giocatore
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  //valore condizionale di isEditing, ossia se isEditing è true, mostramo l'input per inserire il nome
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required onChange={handleChange} value={playerName} />
    );
  }

  return (
    <li>
      <span className="player">
        {/* richiamiamo playerName in modo dinamico, dove in base al valore dello State, mostrerà il nome o l'input */}
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        <button className="button" onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </span>
    </li>
  );
}

export default Player;
