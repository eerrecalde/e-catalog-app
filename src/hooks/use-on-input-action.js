import { useState } from 'react';

const useDarkMode = (isChecked, onPositive, onNegative, callback) => {
  const [checked, setChecked] = useState(isChecked);
  let alreadyTriggered = false;

  function setState(v) {
    if (v && onPositive && !alreadyTriggered) {
      alreadyTriggered = true;
      onPositive();
    } else if (onNegative) {
      onNegative();
    }

    callback(v);
  }

  const handleInputChange = event => {
    event.persist();
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setChecked(value);
    setState(value);
  };

  // if (checked && !alreadyTriggered) {
  //   alreadyTriggered = true;
  //   onPositive();
  // }

  return {
    checked,
    handleInputChange,
  };
};

export default useDarkMode;
