import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useOnInputAction from '../../hooks/use-on-input-action';

function DarkSwitch({ isChecked, onDarkModeChange } = { isChecked: false }) {
  const { t } = useTranslation();

  function onChecked() {
    localStorage.setItem('darkSwitch', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    console.log('Checked');
  }

  function onUnchecked() {
    localStorage.removeItem('darkSwitch');
    document.body.removeAttribute('data-theme');
    console.log('Unchecked');
  }

  const {
    checked, handleInputChange,
  } = useOnInputAction(isChecked, onChecked, onUnchecked, v => {
    console.log('v', v);
    onDarkModeChange(v);
  });

  if (checked && isChecked) {
    onChecked();
  }

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <span className="custom-control custom-switch ml-auto">
      <input type="checkbox" checked={checked} onChange={handleInputChange} className="custom-control-input" name="darkSwitch" id="darkSwitch" />
      <label className="custom-control-label cursor-pointer" htmlFor="darkSwitch">
        {t('header.darkMode')}
      </label>
    </span>
  );
}

DarkSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onDarkModeChange: PropTypes.func.isRequired,
};

export default DarkSwitch;
