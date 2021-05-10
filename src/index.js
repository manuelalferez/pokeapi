import React from 'react';
import ReactDOM from 'react-dom';
import fetchAll from "./utils/fetchAll.js";

const App = () => {
  return (
    <div>{fetchAll()}</div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);