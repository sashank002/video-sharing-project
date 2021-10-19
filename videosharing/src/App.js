import React, { useEffect } from "react";
import { useContext } from "react";

import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  // __RouterContext,
} from "react-router-dom";
// import { __RouterContext } from "react-router";
import { __RouterContext } from "react-router";

import Upload from "./components/Upload";
import Home from "./components/Home";
import Video from "./components/Video";
import StartScreen from "./components/StartScreen";

import { useTransition, animated } from "react-spring";

// function useRouter() {
//   return useContext(__RouterContext);
// }

function App() {
  useEffect(() => {}, []);

  return (
    <Router>
      <div style={{ backgroundColor: "#181818" }}>
        <Switch>
          <Route exact path="/" component={StartScreen}></Route>
          <Route exact path="/home/*" component={Home}></Route>
          <Route exact path="/upload" component={Upload}></Route>
          <Route exact path="/video/:videoId" component={Video}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
