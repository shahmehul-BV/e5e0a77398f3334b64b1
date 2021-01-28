import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Screens/Home";
import Details from "./Screens/Details";

function App() {
  return (
    <div className="App">
      <div class="header">
        <h1>My Website</h1>
        <p>Resize the browser window to see the effect.</p>
      </div>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/details/:id"} component={Details} />
        </Switch>
      </BrowserRouter>
      <div class="footer">
        <h2>Footer</h2>
      </div>
    </div>
  );
}

export default App;
