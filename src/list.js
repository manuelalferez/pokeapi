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
    console.log(pokeList.results);
  };

  /*const pokemon = () => {
        //create div with name and sprite image
    }

    const mapList = () => {
        //map through fetchList array with pokemon()
    }
    */
  return (
  <div className="container">
      <button onClick={fetchList}>Fetch</button>
  </div>
  );
}