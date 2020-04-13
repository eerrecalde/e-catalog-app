import { useState } from 'react';

export function useLocalstorage(initialKey) {
  const [key] = useState(initialKey);
  const [localValue, setLocalValue] = useState(localStorage.getItem(key));

  function setLoacalstorage(val) {
    localStorage.setItem(key, val);
    setLocalValue(localStorage.getItem(key));
  }

  return [localValue, setLoacalstorage];
}

export default useLocalstorage;
