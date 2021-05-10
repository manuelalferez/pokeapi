import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [pokeData, setPokeData] = useState(null);

  const getPokemon = async () => {
    const request = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const json = await request.json();
    setPokeData(json);
  };

  return (
    <div>
      <button
        onClick={() => {
          getPokemon();
        }}
      >
        Fetch
      </button>
      <img src={pokeData ? pokeData.sprites.front_default : ""} alt=""/>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
