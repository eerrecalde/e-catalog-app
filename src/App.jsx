import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// import { withAuthenticator } from 'aws-amplify-react';

import LanguagePicker from './components/language-picker/language-picker';
import { routes } from './routes';
import DarkSwitch from './components/dark-mode-switch/dark-mode-switch';

function App() {
  const [t] = useTranslation();
  const [darkModeActive, setDarkModeActive] = useState(localStorage.getItem('darkSwitch') !== null &&
  localStorage.getItem('darkSwitch') === 'dark');

  function handleDarkModeChange(v) {
    setDarkModeActive(v);
  }

  return (
    <Router>
      <div>
        <nav className={`navbar mb-3 navbar-expand-lg ${(darkModeActive ? 'navbar-dark bg-dark' : 'navbar-light bg-light')}`}>
          <a className="navbar-brand" href="/">{t('header.title')}</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
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
                          {t(`header.nav.${name}`)}
                        </NavLink>
                      </li>
                    ))
                  ))
                }
            </ul>
            <div className="form-inline my-2 my-lg-0">
              <div>
                <LanguagePicker />
              </div>
              <div>
                <DarkSwitch
                  isChecked={darkModeActive}
                  onDarkModeChange={handleDarkModeChange}
                />
              </div>
            </div>
          </div>
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
