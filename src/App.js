import React, { useState, useEffect } from "react";
import PokemonName from "./PokemonName";
import axios from "axios";
import Pagination from "./Pagination";
import PokeDesc from "./PokeDesc";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeSprite, setPokeSprite] = useState();
  const [pokeDesc, setPokeDesc] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=1"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokemon + "")
      .then((res) => {
        setPokeDesc(res.data.height);
      });

    /*
    DESCRIPTION & SPRITE
    fetch https://pokeapi.co/api/v2/{pokemon}
    set Desc and Sprite from the results of the fetch
      */
    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <>
      <PokemonName pokemon={pokemon} />
      <PokeDesc pokeDesc={pokeDesc} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
