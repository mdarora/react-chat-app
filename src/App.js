import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

const App = () => {
  return (
  <>
  <Router>
    <Switch>

      <Route path='/register'>
        <Register></Register>
      </Route>

      <Route path='/login'>
        <Login></Login>
      </Route>

      <Route path='/'>
        <Home></Home>
      </Route>
    </Switch>
  </Router>  
  </>
  )
}

export default App
