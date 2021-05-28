import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/single.css";

export default function Single() {
  const { number } = useParams();
  const [searchPoke, setSearchPoke] = useState("")
  const [pokeData, setPokeData] = useState(null);
  const [pokeNum, setPokeNum] = useState(number);
  const [pokeDesc, setPokeDesc] = useState(null);

  useEffect(() => {
    fetchData(number);
  }, []);

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

  const fetchData = (num) => {
    setPokeNum(num);
    getPokeData(num);
    getPokeDesc(num);
  };

  let currentNum = pokeNum;

  return (
    <div className="container">
      <Link
        className="list_button"
        to={`/list/${currentNum - (currentNum % 20)}`}
      >
        List
      </Link>
      <div>
        <div className="singleDiv">
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
                fetchData(--currentNum);
              }}
            >
              &#60; &#8194; Previous
            </button>
          )}
          <button
            onClick={() => {
              fetchData(++currentNum);
            }}
          >
            Next &#8194; &#62;
          </button>
        </div>
        <form onSubmit={console.log(searchPoke)}>
          <input type="text" onChange={(e) => setSearchPoke(e.nativeEvent.data)}></input>
          <button
            onClick={() => {
              fetchData(searchPoke);
            }}
          >
            Search
          </button>
        </form>
      </div>
      <button
        className="side_button"
        onClick={() => {
          fetchData(Math.round(Math.random() * 650));
        }}
      >
        Random
      </button>
    </div>
  );
}
