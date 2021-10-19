import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  __RouterContext,
} from "react-router-dom";
import "../css/Home.css";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faGamepad,
  faTheaterMasks,
  faPodcast,
  faFilm,
  faVideo,
  faMusic,
  faBasketballBall,
} from "@fortawesome/free-solid-svg-icons";

import { useTransition, animated } from "react-spring";

import axios from "axios";

import { Navbar } from "react-bootstrap";
import logo from "../images/Logo.png";
import All from "./All";
import Movies from "./Movies";
import Comedy from "./Comedy";
import Sports from "./Sports";
import Podcasts from "./Podcasts";
import News from "./News";
import Gaming from "./Gaming";
import Music from "./Music";

const HomeOld = () => {
  return (
    <div>
      <div className="navbar navbar-custom">
        <img src={logo} />

        <h2 className="cafe-title"> Video Cafe </h2>

        <Link to="/upload">
          {" "}
          <button className="upld-btn">Upload</button>{" "}
        </Link>
      </div>

      <div className="main-body">
        <div className="leftBar">
          <h2 className="category-title">Categories</h2>

          {/* </Link> */}

          <NavLink
            to="all"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text" style={{ textAlign: "center" }}>
              All
            </h5>
          </NavLink>
          <NavLink
            to="news"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              <FontAwesomeIcon
                icon={faNewspaper}
                style={{ marginRight: "15" }}
              />
              News
            </h5>
          </NavLink>
          <NavLink
            to="gaming"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              {" "}
              <FontAwesomeIcon icon={faGamepad} style={{ marginRight: "15" }} />
              Gaming
            </h5>
          </NavLink>
          <NavLink
            to="comedy"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              {" "}
              <FontAwesomeIcon
                icon={faTheaterMasks}
                style={{ marginRight: "15" }}
              />
              Comedy
            </h5>
          </NavLink>
          <NavLink
            to="podcasts"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              <FontAwesomeIcon icon={faPodcast} style={{ marginRight: "15" }} />
              Podcasts
            </h5>
          </NavLink>
          <NavLink
            to="movies"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              <FontAwesomeIcon icon={faFilm} style={{ marginRight: "15" }} />
              Movies
            </h5>
          </NavLink>
          <NavLink
            to="sports"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              <FontAwesomeIcon
                icon={faBasketballBall}
                style={{ marginRight: "15" }}
              />
              Sports
            </h5>
          </NavLink>
          <NavLink
            to="music"
            style={{ textDecoration: "none" }}
            activeStyle={{ backgroundColor: "black", textAlign: "center" }}
            className="cat-link"
          >
            <h5 className="cat-link-text">
              <FontAwesomeIcon icon={faMusic} style={{ marginRight: "15" }} />
              Music
            </h5>
          </NavLink>
        </div>

        <div className="right-bar">
          <div>
            <Switch>
              <Route exact path="/home/all" component={All}></Route>
              <Route exact path="/home/sports" component={Sports}></Route>
              <Route exact path="/home/comedy" component={Comedy}></Route>
              <Route exact path="/home/gaming" component={Gaming}></Route>
              <Route exact path="/home/movies" component={Movies}></Route>
              <Route exact path="/home/news" component={News}></Route>
              <Route exact path="/home/podcasts" component={Podcasts}></Route>
              <Route exact path="/home/music" component={Music}></Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOld;
