import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

// import { withAuthenticator } from 'aws-amplify-react';

import { routes } from './routes';
import DarkSwitch from './components/dark-mode-switch/dark-mode-switch';

function App() {
  return (
    <Router>
      <div>

        <nav className="container my-3">
          <ul className="nav nav-pills">
            {
              routes.map(({ path, name, hidden }) => (
                (hidden ? '' : (
                  <li
                    key={path}
                    className="nav-item"
                  >
                    <NavLink
                      exact={path === '/'}
                      className="nav-link"
                      to={path}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))
              ))
            }
            <DarkSwitch isChecked={localStorage.getItem('darkSwitch') !== null &&
              localStorage.getItem('darkSwitch') === 'dark'}
            />
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {routes.map(({ path, component }) => (
            <Route
              exact={path === '/'}
              key={path}
              path={path}
              component={component}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

// export default withAuthenticator(App, { includeGreetings: true });
export default App;
