import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Nav from './COMPONENTS/navigation.js';
import Home from './COMPONENTS/home.js';
import About from './COMPONENTS/about.js';
import Pokemon from './COMPONENTS/pokemon.js'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="APP">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/pokemon/:pokemon-:id" component={Pokemon} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
