import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Single from "./single";
import List from "./list";

function App() {
  return (
    <Router>
      <Switch>
       <Route exact path={"/"} component={List} />
        <Route exact path={"/list/:offset"} component={List} />
        <Route exact path={"/single"} component={Single} />
        <Route exact path={"/single/:number"} component={Single} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
