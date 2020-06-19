import React from 'react';
import Header from './views/Header';
import Landing from './views/landing/Landing';
import Journey from './views/journey/Journey';
import Topic from './views/topic/Topic';
import { LabComponent } from './views/lab/Lab';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <div className="header-cont">
            <Header />
          </div>
          <div className="app-body">
            <div className="content">
              <Switch>
                <Route path="/lab/:topic_id/:lab_id">
                  <LabComponent />
                </Route>
                <Route path="/topic/:topic">
                  <Topic />
                </Route>
                <Route path="/journey/:journey_id">
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
    </Provider>
  );
}

export default App;
