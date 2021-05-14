import React, { useState } from "react";
import "./styles/list.css";

export default function List() {
  const [pokeList, setPokeList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  const fetchList = async () => {
    const request = await fetch(currentPageUrl);
    const json = await request.json();
    setPokeList(json);
    console.log(pokeList);
  };

  const Pokemon = ({ pokemon }) => {
    return (
      <div>
        <h2>{pokemon}</h2>
      </div>
    );
  };

  const MapList = ({ pokeList }) => {
    const mapList = Object.keys(pokeList).map((pokemon) => (
      <Pokemon key={pokemon} pokemon={pokemon} />
    ));
    return <div>{mapList}</div>;
  };

  return (
    <div className="container">
      <button onClick={fetchList}>Fetch</button>
      <MapList pokeList={pokeList} />
    </div>
  );
}
