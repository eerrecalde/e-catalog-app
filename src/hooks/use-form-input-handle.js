import { useState } from 'react';

const useFormInputHandle = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  console.log('useFormInputHandle', initialValues);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      callback();
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs(() => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  if (initialValues.id && !inputs.id) {
    console.log('setInputs', initialValues);
    setInputs(() => ({ ...initialValues }));
  }

  return {
    handleSubmit,
    setInputs,
    handleInputChange,
    inputs,
  };
};

export default useFormInputHandle;
