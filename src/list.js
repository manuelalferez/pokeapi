import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function List() {
  const { offset } = useParams();
  const [pokeList, setPokeList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    offset
      ? fetchList("https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=20")
      : fetchList("https://pokeapi.co/api/v2/pokemon");
  }, []);

  const fetchList = async (url) => {
    setLoading(true);
    const request = await fetch(url);
    const json = await request.json();
    setNextPageUrl(json.next);
    setPrevPageUrl(json.previous);
    setPokeList(json.results);
    setLoading(false);
  };

  const Pokemon = ({ pokemon, pokeUrl }) => {
    const number = pokeUrl.slice(34, -1);
    if (loading)
      return (
        <div className="listElement">
          <div className="lds-dual-ring"></div>
        </div>
      );
    return (
      <div className="listElement">
        <Link to={`/single/${number}`}>
          <div>
            {loading ? (
              <div className="lds-dual-ring"></div>
            ) : (
              <img
                src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + number + ".png"}
                alt={""}
              ></img>
            )}
          </div>
          <div>
            {number}: {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
          </div>
        </Link>
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
      <div>
        {prevPageUrl && (
          <button
            className="arrow_left"
            onClick={() => {
              fetchList(prevPageUrl);
            }}
          />
        )}
      </div>
      <MapList pokeList={pokeList} />
      <button
        className="arrow_right"
        onClick={() => {
          fetchList(nextPageUrl);
        }}
      />
    </div>
  );
}
