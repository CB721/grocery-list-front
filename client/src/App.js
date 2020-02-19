import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "shards-react";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import "shards-ui/dist/css/shards.min.css"
import './App.scss';

function App() {
  const create = { name: "Join", link: "/join" };
  const signIn = { name: "Login", link: "/login" };
  const signOut = { name: "Logout", link: "/signout" };
  const profile = { name: "Profile", link: "/profile" };
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
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
