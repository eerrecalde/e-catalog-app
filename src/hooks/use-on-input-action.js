import { useState } from 'react';

const useDarkMode = (isChecked, onPositive, onNegative) => {
  const [checked, setChecked] = useState(isChecked);
  let alreadyTriggered = false;

  function setState(v) {
    if (v && onPositive && !alreadyTriggered) {
      alreadyTriggered = true;
      onPositive();
    } else if (onNegative) {
      onNegative();
    }
  }

  const handleInputChange = event => {
    event.persist();
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setChecked(value);
    setState(value, onPositive, onNegative);
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
