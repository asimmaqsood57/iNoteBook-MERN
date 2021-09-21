import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message="This is amazing react course" />
        <Switch>
          <Route exact path="/About">
            <About />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </NoteState>
    </>
  );
}

export default App;
