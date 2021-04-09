import React from 'react'

export default function PokeDesc({pokeDesc}) {
    return (
        <div>
        <p>{JSON.stringify(pokeDesc)}</p>
        </div>
      );
    }