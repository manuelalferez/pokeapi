import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Single from "./single.js";
import List from "./list.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/single">
          <Single />
        </Route>
        <Route path="/list">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
