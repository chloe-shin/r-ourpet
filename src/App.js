import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'
import Footer from './components/Footer'
import Location from './components/Location';
import RegisterSuccess from './components/RegisterSuccess';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const existingToken = localStorage.getItem("token");
  // host:3000/?api_key=fghjkljhghjk
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(existingToken || accessToken)


  useEffect(() => {
    getUser()
    // window.history.replaceState({}, document.title, window.location.pathname);
  }, [])

  const getUser = async () => {
    const token = existingToken || accessToken
    const res = await fetch(process.env.REACT_APP_BURL + '/getuser', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', token)
      setUser(data)
    } else {
      localStorage.clear('token')
      setUser(null)
    }
  }

  // {window.location.pathname ="/besitter" ? 'bg': '' }
  return (
    <Router>
      <div className= 'bg'>
        <Nav user={user} setUser={setUser} />
        <Switch>
          <Route path="/login" exact render={() => <Login setUser={setUser} />} />
          <Route path="/register" exact component={Register} />
          <Route path="/register-success" exact component={RegisterSuccess} />
          <Route path="/location" exact component={Location}/>
          <Route path="/" render={() => <Main user={user} setUser={setUser} />} />

          </Switch>
        <footer>
        <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
