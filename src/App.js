import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Logout from './components/Logout';
import Register from "./components/Register";
import ResetPassword from './components/ResetPassword';

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

      <Route path='/logout'>
        <Logout></Logout>
      </Route>

      <Route path='/reset-password'>
        <ResetPassword></ResetPassword>
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
