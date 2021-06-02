import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/single.css";

export default function Single() {
  const searchRef = useRef();
  const { number } = useParams();
  const [pokeData, setPokeData] = useState(null);
  const [pokeNum, setPokeNum] = useState();
  const [pokeDesc, setPokeDesc] = useState(null);

  useEffect(() => {
    fetchData(number ? number : "1");
  }, []);

  useEffect(() => {
    setPokeNum(pokeData && pokeData.forms[0].url.slice(39, -1));
  }, [pokeData]);

  const fetchFun = async (link, num, state) => {
    const request = await fetch(link + num);
    const json = await request.json();
    state(json);
  };

  const fetchData = (num) => {
    fetchFun("https://pokeapi.co/api/v2/pokemon/", num, setPokeData);
    fetchFun("https://pokeapi.co/api/v2/pokemon-species/", num, setPokeDesc);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchRef.current.value)
      fetchData(searchRef.current.value);
  };

  return (
    <div className="container">
      <Link className="list_button" to={`/list/${pokeNum - (pokeNum % 20)}`}>
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
          {pokeNum > 1 && (
            <button
              onClick={() => {
                fetchData(pokeNum - 1);
              }}
            >
              &#60; &#8194; Previous
            </button>
          )}
          <button
            onClick={() => {
              fetchData(parseInt(pokeNum) + 1);
            }}
          >
            Next &#8194; &#62;
          </button>
        </div>
        <div>
          <input type="text" ref={searchRef} onKeyDown={handleKeyDown} />
          <button
            onClick={() => {
              searchRef.current.value && fetchData(searchRef.current.value);
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
