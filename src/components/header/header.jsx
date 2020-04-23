import React, { useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import LanguagePicker from '../language-picker/language-picker';
import DarkSwitch from '../dark-mode-switch/dark-mode-switch';
import Nav from '../nav';

function Header(routing) {
  const [t] = useTranslation();
  const [darkModeActive, setDarkModeActive] = useState(
    localStorage.getItem('darkSwitch') !== null && localStorage.getItem('darkSwitch') === 'dark',
  );
  function handleDarkModeChange(v) {
    setDarkModeActive(v);
  }

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg ${
          darkModeActive ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
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
          <Nav routes={routing.routes} />
          <div className="form-inline my-2 my-lg-0">
            <div>
              <LanguagePicker />
            </div>
            <div>
              <DarkSwitch isChecked={darkModeActive} onDarkModeChange={handleDarkModeChange} />
            </div>
            <div>
              <AmplifySignOut />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
