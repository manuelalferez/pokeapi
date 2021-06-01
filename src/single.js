import React, { useState, useEffect, createRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/single.css";

export default function Single() {
  const searchRef = React.createRef();
  const { number } = useParams();
  const [pokeData, setPokeData] = useState(null);
  const [pokeNum, setPokeNum] = useState();
  const [pokeDesc, setPokeDesc] = useState(null);

  useEffect(() => {
    fetchData(number ? number : "1");
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
        <div>
          <input type="text" ref={searchRef} />
          <button
            onClick={() => {
              fetchData(searchRef.current.value);
            }}
          >
            Search
          </button>
        </div>
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
