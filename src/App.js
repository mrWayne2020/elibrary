import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// CSS
import './App.css';

// Components
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Membership from './components/Membership/Membership';
import About from './components/About/About';
import Payment from './components/Payment/Payment';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/home' />} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/membership' component={Membership} />
          <Route exact path='/about' component={About} />
          <Route exact path='/payment' component={Payment} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
