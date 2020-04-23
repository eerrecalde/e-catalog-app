import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlagIcon from '../flag-icon/flag-icon';

function LanguagePicker() {
  const { i18n } = useTranslation();
  const { languagesMeta: languages } = i18n.options; // Added this myself
  const [selected, setSelected] = useState(i18n.getDataByLanguage(i18n.language).translation.meta);

  function languageChange(lang) {
    i18n.changeLanguage(lang.title);
    setSelected(lang);
  }

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn button-primary btn-link dropdown-toggle p-0 mr-3"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="icon mr-2">
          <FlagIcon code={selected.flagCode} />
        </span>
        {selected.title}
      </button>
      <div className="dropdown-menu">
        {languages.map((language) => (
          <button
            key={language.title}
            type="button"
            className={`dropdown-item nav-link ${
              selected.title === language.title ? 'active' : ''
            }`}
            onClick={() => languageChange(language)}
          >
            <span className="icon mr-2">
              <FlagIcon code={language.flagCode} />
            </span>
            {language.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguagePicker;
