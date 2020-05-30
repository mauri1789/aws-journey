import React from 'react';
import Header from './views/Header';
import Landing from './views/landing/Landing';
import Journey from './views/journey/Journey';
import Topic from './views/topic/Topic';
import Lab from './views/lab/Lab';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="header-cont">
          <Header />
        </div>
        <div className="app-body">
          <div className="content">
            <Switch>
              <Route path="/lab/:topic_id/:lab_id">
                <Lab />
              </Route>
              <Route path="/topic/:topic">
                <Topic />
              </Route>
              <Route path="/journey/:journey">
                <Journey />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>            
          </div>
          <div className="footer">
            this is footer
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
