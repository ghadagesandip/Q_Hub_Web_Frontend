import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';
import Home from './components/home/_Home';
import Dashboard from './components/dashboard/_Dashboard';
import Clients from './components/clients/_Clients';
import Technology from './components/technologies/_Technology';
import Employee from './components/employee/_Employee';
import Questions from './components/questions/_Questions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/questions' component={Questions} />
                <Route exact path='/clients' component={Clients} />
                <Route exact path='/technology' component={Technology} />
                <Route exact path='/employee' component={Employee} />
              </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
