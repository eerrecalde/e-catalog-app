import React from 'react';
import PropTypes from 'prop-types';
import useOnInputAction from '../../hooks/use-on-input-action';

function DarkSwitch({ isChecked } = { isChecked: false }) {
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
  } = useOnInputAction(isChecked, onChecked, onUnchecked);

  if (checked && isChecked) {
    onChecked();
  }

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <span className="custom-control custom-switch ml-auto">
      <input type="checkbox" checked={checked} onChange={handleInputChange} className="custom-control-input" name="darkSwitch" id="darkSwitch" />
      <label className="custom-control-label cursor-pointer" htmlFor="darkSwitch">
        Dark Mode
      </label>
    </span>
  );
}

DarkSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
};

export default DarkSwitch;
