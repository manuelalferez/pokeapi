import React, { useState } from "react";
import "./styles/list.css";

export default function List() {
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  const fetchList = async () => {
    const request = await fetch(currentPageUrl);
    const json = await request.json();
    setNextPageUrl(json.next);
    setPrevPageUrl(json.previous);
    setPokeList(json.results);
  };

  const [pokeList, setPokeList] = useState(fetchList());

  const nextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const prevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  const Pokemon = ({ pokemon }) => {
    return (
      <div>
        <h2>{pokemon}</h2>
      </div>
    );
  };

  const MapList = ({ pokeList }) => {
    const mapList = Object.keys(pokeList).map((i, keyName) => (
      <Pokemon key={i} pokemon={pokeList[keyName].name} />
    ));
    return <div>{mapList}</div>;
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
