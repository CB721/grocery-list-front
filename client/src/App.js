import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "shards-react";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import "shards-ui/dist/css/shards.min.css";
import API from "./utilities/api";
import './App.scss';
import validateUser from './utilities/validateUser';

function App() {
  const create = { name: "Join", link: "/join" };
  const signIn = { name: "Login", link: "/login" };
  const signOut = { name: "Logout", link: "/signout" };
  const profile = { name: "Profile", link: "/profile" };
  const [navOptions, setNavOptions] = useState([create, signIn]);
  const [user, setUser] = useState([]);
  const [IP, setIP] = useState("");

  // useEffect(() => {
  //   // get user IP address to compare with DB
  //   API.getIP()
  //     .then(res => setIP(res.data))
  //     .catch(err => console.log(err));
  // }, []);
  function userLogin(email, password, remember) {
    const userData = {
      email,
      password,
      ip: IP
    }
    API.userLogin(userData)
      .then(res => {
        setUser(res.data);
        if (remember) {
          localStorage.setItem("token", res.data[0].user_auth);
        }
        window.location.href = "/profile";
      })
      .catch(err => {
        console.log(err);
      });
  }
  // determine which page user is on in order to validate
  useEffect(() => {
    const token = localStorage.getItem("token");
    let remember = false;
    if (token && token.length > 60) {
      remember = true;
    }
    // make sure the IP has been found before attempting to validate
    API.getIP()
      .then(res => {
        setIP(res.data);
        switch (window.location.pathname) {
          case "/profile":
            validateUser.validate(user.user_auth || token, IP || res.data, remember)
              // if they are validated, allow them to continue to page
              .then((res) => {
                setUser(res);
                // change side menu options
                setNavOptions([profile, signOut]);
              })
              .catch(() => {
                // if not validated, send to login page
                window.location.href = "/login";
              });
            break;
          default:
            return;
        }
      })
      .catch(err => console.log(err));
  }, [window.location.pathname]);



  return (
    <Router>
      <Container fluid={true}>
        <Navbar options={navOptions} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact path="/login"
            render={props => <Login {...props} userLogin={userLogin} />}
          />
          <Route exact path="/join" component={CreateAccount} />
          <Route
            exact path="/profile"
            render={props => <Profile {...props} user={user} />}
          />
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
