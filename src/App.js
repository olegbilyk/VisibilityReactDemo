import React, { Fragment } from 'react';
import IntervalVisibility from './IntervalVisibility';
import ChangeVisibility from './ChangeVisibility';
import ChangeFavicon from './ChangeFavicon';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to VisibilityJS React App Demo</h1>
        <h3 className="App-desc">
          <a href="https://github.com/ai/visibilityjs">https://github.com/ai/visibilityjs</a>
        </h3>
      </header>
      <Router>
        <Fragment>
          <nav>
            <h4>Menu:</h4>
            <ul>
              <li>
                <Link to="/change">ChangeVisibility</Link>
              </li>
              <li>
                <Link to="/interval">IntervalVisibility</Link>
              </li>
              <li>
                <Link to="/favicon">ChangeFavicon</Link>
              </li>
            </ul>
          </nav>
          <Route path="/change" component={ChangeVisibility} />
          <Route path="/interval" component={IntervalVisibility} />
          <Route path="/favicon" component={ChangeFavicon} />
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
