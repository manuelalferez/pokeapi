import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/single.css";

const App = () => {
  const [pokeData, setPokeData] = useState(null);
  const [pokeNum, setPokeNum] = useState(0);
  const [pokeDesc, setPokeDesc] = useState(null);

  const getPokeData = async (num) => {
    const request = await fetch("https://pokeapi.co/api/v2/pokemon/" + num);
    const json = await request.json();
    setPokeData(json);
  };

  const getPokeDesc = async (num) => {
    const request = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" + num
    );
    const json = await request.json();
    setPokeDesc(json);
  };

  const fetchData = () => {
    setPokeNum(currentNum);
    getPokeData(currentNum);
    getPokeDesc(currentNum);
  };

  let currentNum = pokeNum;
  return (
    <div className="container">
      <button className="side_button">List</button>
      <div>
        <div>
          <img src={pokeData && pokeData.sprites.front_default} alt="" />
          <h1>{pokeData && pokeData.name.toUpperCase()}</h1>
          <p>
            {pokeDesc &&
              pokeDesc.flavor_text_entries[1].flavor_text.replace("\f", " ")}
          </p>
        </div>
        <div className="prevNext">
          {currentNum > 1 && (
            <button
              onClick={() => {
                currentNum--;
                fetchData();
              }}
            >
              &#60; &#8194; Previous
            </button>
          )}
          <button
            onClick={() => {
              currentNum++;
              fetchData();
            }}
          >
            {!pokeData ? "Start" : "Next"} &#8194; &#62;
          </button>
        </div>
      </div>
      <button
        className="side_button"
        onClick={() => {
          currentNum = Math.round(Math.random() * 650);
          fetchData();
        }}
      >
        Random
      </button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
