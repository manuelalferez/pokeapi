import React, { useEffect, useState } from "react";

const Index = () => {
  const [pokeName, setPokeName] = useState("");
  const [pokeData, setPokeData] = useState(null);

  useEffect(async () => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const request = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokeName
    );
    const json = await request.json();
    setPokeData(json);
  };

  if (pokeData === null) {
    return <div>Loadin!</div>;
  }

  return (
    <div>
      <img src={pokeData.sprites.front_default} />
      <input
        value={pokeName}
        onChange={(e) => {
          setPokeName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetchPokemon();
        }}
      >
        Fetch pokemon
      </button>
    </div>
  );
};

export default Index;
