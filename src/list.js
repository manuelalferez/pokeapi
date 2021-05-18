import React, { useState, useEffect } from "react";
import "./styles/list.css";

export default function List() {
  const [pokeList, setPokeList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const request = await fetch(currentPageUrl);
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
          {number}: {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
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
    return <div className="poke_list">{mapList}</div>;
  };

  return (
    <div className="container">
      <button
        className="side_button"
        onClick={() => {
          setCurrentPageUrl(prevPageUrl);
          fetchList();
        }}
      >
        Previous
      </button>
      <MapList pokeList={pokeList} />
      <button
        className="side_button"
        onClick={() => {
          setCurrentPageUrl(nextPageUrl);
          fetchList();
        }}
      >
        Next
      </button>
    </div>
  );
}
