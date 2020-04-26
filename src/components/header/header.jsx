import React, { useContext } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import { ThemeContext, AuthContext } from '../../context';
import LanguagePicker from '../language-picker/language-picker';
import DarkSwitch from '../dark-mode-switch/dark-mode-switch';
import { routes } from '../../routes';
import Nav from '../nav';

function Header() {
  const [t] = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const { authState, setAuthState } = useContext(AuthContext);
  console.log('theme', ThemeContext);

  function handleDarkModeChange(v) {
    setTheme(v ? 'dark' : 'light');
  }

  function notifyStateChange(state) {
    console.log('state', state);
    setAuthState(state);
  }

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg ${
          theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
        }`}
      >
        <a className="navbar-brand" href="/">
          {t('header.title')}
        </a>
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
          <Nav routes={routes} />
          <div className="form-inline my-2 my-lg-0">
            <div>
              <LanguagePicker />
            </div>
            <div>
              <DarkSwitch isChecked={theme === 'dark'} onDarkModeChange={handleDarkModeChange} />
            </div>
            {authState === 'signedIn' ? (
              <AmplifySignOut
                // style={signOutStyles}
                // className="btn btn-sm"
                handleAuthStateChange={notifyStateChange}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
