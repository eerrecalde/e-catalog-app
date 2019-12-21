import { useState } from 'react';

const useLocalStorageArrays = () => {
  const [arr, setArr] = useState([]);

  const currLocalStorageStr = localStorage.getItem('favorites');

  if (currLocalStorageStr) {
    setArr(JSON.parse(`[${currLocalStorageStr}]`));
  }

  return {
    arr,
    setArr,
  };
};

export default useLocalStorageArrays;
