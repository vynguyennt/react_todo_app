import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './containers/Home';
import History from './containers/History';

import './styles/App.css';

class App extends Component {
  componentDidMount() {
    // get initiate todo list from localStorage
    if(JSON.parse(localStorage.getItem('todos')) === null) {
      let todos = [];
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    // get initiate history list from localStorage
    if(JSON.parse(localStorage.getItem('history')) === null) {
      let history = [];
      localStorage.setItem('history', JSON.stringify(history));
    }
  }
  render() {
    //router for Home page and history page
    return (
     <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/history" component={History} />
        </div>
     </Router>
    );
  }
}

export default App;
