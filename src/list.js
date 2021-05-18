import React, { useState, useEffect } from "react";
import "./styles/list.css";

export default function List() {
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [pokeList, setPokeList] = useState([]);

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

  const nextPage = () => {
    setCurrentPageUrl(nextPageUrl);
    fetchList();
  };

  const prevPage = () => {
    setCurrentPageUrl(prevPageUrl);
    fetchList();
  };

  const Pokemon = ({ pokemon, pokeUrl }) => {
    const number = pokeUrl.slice(34, -1);
    return (
      <div>
        <h2>{number}: {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</h2>
      </div>
    );
  };

  const MapList = ({ pokeList }) => {
    const mapList = Object.keys(pokeList).map((i, keyName) => (
      <Pokemon key={i} pokemon={pokeList[keyName].name} pokeUrl={pokeList[keyName].url} />
    ));
    return <div className="poke_list">{mapList}</div>;
  };

  return (
    <div className="container">
      <button className="side_button" onClick={prevPage}>
        Previous
      </button>
      <MapList pokeList={pokeList} />
      <button className="side_button" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
