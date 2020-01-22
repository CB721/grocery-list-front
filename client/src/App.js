import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "shards-react";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.scss';

function App() {
  const create = { name: "Create Account", link: "/join" };
  const signIn = { name: "Login", link: "/login" };
  const signOut = { name: "Logout", link: "/signout" }
  const [navOptions, setNavOptions] = useState([create, signIn]);

  return (
    <Router>
      <Container fluid={true}>
        <Navbar options={navOptions} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={CreateAccount} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
