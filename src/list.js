import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/list.css";

export default function List() {
  const [pokeList, setPokeList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    fetchList("https://pokeapi.co/api/v2/pokemon");
  }, []);

  const fetchList = async (url) => {
    const request = await fetch(url);
    const json = await request.json();
    setNextPageUrl(json.next);
    setPrevPageUrl(json.previous);
    setPokeList(json.results);
  };

  const fetchImg = async (url) => {
    const request = await fetch(url);
    const json = await request.json();
    return json.sprites.front_default;
  };

  const Pokemon = ({ pokemon, pokeUrl }) => {
    const number = pokeUrl.slice(34, -1);
    return (
      <div>
        <img src={fetchImg(pokeUrl)} alt=""></img>
        <h2>
          <Link to={`/single/${number}`}>
            {number}: {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
          </Link>
        </h2>
      </div>
    );
  };

  const MapList = ({ pokeList }) => {
    const mapList = Object.keys(pokeList).map((i, keyName) => (
      <Pokemon
        key={i}
        pokemon={pokeList[keyName].name}
        pokeUrl={pokeList[keyName].url}
      />
    ));
    console.log(nextPageUrl)
    return <div className="poke_list">{mapList}</div>;
  };

  return (
    <div className="container">
      <button
        className="side_button"
        onClick={() => {
          fetchList(prevPageUrl);
        }}
      >
        Previous
      </button>
      <MapList pokeList={pokeList} />
      <button
        className="side_button"
        onClick={() => {
          fetchList(nextPageUrl);
        }}
      >
        Next
      </button>
    </div>
  );
}
