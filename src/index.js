import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [pokeData, setPokeData] = useState(null);
  const [pokeNum, setPokeNum] = useState(1);

  const getPokemon = async (num) => {
    const request = await fetch("https://pokeapi.co/api/v2/pokemon/" + num);
    const json = await request.json();
    setPokeData(json);
  };

  let currentNum = pokeNum;

  return (
    <div>
      <img src={pokeData ? pokeData.sprites.front_default : ""} alt="" />
      <button
        onClick={() => {
          currentNum--;
          getPokemon(currentNum);
          setPokeNum(currentNum);
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          currentNum++;
          getPokemon(currentNum)
          setPokeNum(currentNum)
        }}
      >
        Next
      </button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
