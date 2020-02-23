import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory, Link } from "react-router-dom";
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

function App(props) {
  const create = { name: "Join", link: "/join" };
  const signIn = { name: "Login", link: "/login" };
  const signOut = { name: "Logout", link: "/signout" };
  const profile = { name: "Profile", link: "/profile" };
  const [navOptions, setNavOptions] = useState([create, signIn]);
  const [user, setUser] = useState([]);
  const [IP, setIP] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  // let history = useHistory();

  useEffect(() => {
    // get user IP address to compare with DB
    API.getIP()
      .then(res => setIP(res.data))
      .catch(err => console.log(err));
  }, []);
  function userLogin(email, password, remember) {
    const userData = {
      email,
      password,
      ip: IP
    }
    // reset error message
    setError("");
    API.userLogin(userData)
      .then(res => {
        setUser(res.data);
        if (remember) {
          localStorage.setItem("token", res.data[0].user_auth);
        } else {
          sessionStorage.setItem("token", res.data[0].user_auth)
        }
        window.location.href = "/profile";
      })
      .catch(err => {
        console.log("User login err", err);
        setError(err);
      });
  }
  // determine which page user is on in order to validate
  useEffect(() => {
    let token = localStorage.getItem("token");
    let remember = false;
    if (token && token.length > 60) {
      if (token.length > 0) {
        remember = true;
      }
    } else if (sessionStorage.getItem("token")) {
      token = sessionStorage.getItem("token");
    } else {
      token = " ";
    }
    // make sure the IP has been found before attempting to validate
    API.getIP()
      .then(res => {
        setIP(res.data);
        switch (window.location.pathname) {
          case "/profile":
            validateUser.status(user.user_auth || token, IP || res.data, remember)
              // if they are validated, allow them to continue to page
              .then((res) => {
                setUser(res);
                // change side menu options
                setNavOptions([profile, signOut]);
                // get notifications for user
                getAllUserNotifications(res[0].id);
              })
              .catch(() => {
                // if not validated, send to login page
                window.location.href = "/login";
              });
            break;
          default:
            validateUser.status(user.user_auth || token, IP || res.data, remember)
              // if they are validated, update content accordingly
              .then((res) => {
                setUser(res);
                // change side menu options
                setNavOptions([profile, signOut]);
                // get notifications for user
                getAllUserNotifications(res[0].id);
              })
              // since they aren't on a page that requires user info, allow them to remain on current page
              .catch();
            return;
        }
      })
      .catch(err => {
        console.log(err);
        if (remember) {
          // reset all tokens stored
          localStorage.setItem("token", "");
          sessionStorage.setItem("token", "");
          // reset user info
          setUser([]);
          // present user with instructions
          setError("Trouble determining your IP address.  Please try logging in again.");
        }
      });
  }, [window.location.pathname]);
  function getAllUserNotifications(id) {
    API.getNotificationsByUser(id)
      .then(res => {
        setNotifications(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <Router>
      <Container fluid={true}>
        <Navbar
          options={navOptions}
          isLogged={user.length}
          notifications={notifications}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact path="/login"
            render={props =>
              <Login
                {...props}
                userLogin={userLogin}
                error={error}
              />}
          />
          <Route exact path="/join" component={CreateAccount} />
          {user.length === 1 ? (
            <Route
              exact path="/profile"
              render={props => <Profile {...props} user={user} />}
            />
          ) : (<Route />)}
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
