import "./App.css";

import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/About">
            <About />
          </Route>

          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>

          <Route exact path="/login">
            <Login showAlert={showAlert} />
          </Route>

          <Route exact path="/signup">
            <Signup showAlert={showAlert} />
          </Route>
        </Switch>
      </NoteState>
    </>
  );
}

export default App;
