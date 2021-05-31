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
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path="/" component={Home} />
    </Switch>
  </Router>  
  </>
  )
}

export default App
