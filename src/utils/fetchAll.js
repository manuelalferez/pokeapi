export default function fetchAll() {
  const getPokemon = async () => {
    const request = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=30"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
      });
  };
  console.log(getPokemon());
}

/* 
fetch 30, keep next
on pagination: fetch next 30 starting from next + 30, then update next

*/
