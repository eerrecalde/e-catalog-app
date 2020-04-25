import React, { useState, useEffect, useContext } from 'react';
import { AmplifySignIn } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import useFormInputHandle from '../hooks/use-form-input-handle';
import { AuthContext } from '../context';

function CustomSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authState, setAuthState } = useContext(AuthContext);

  const { inputs, setInputs, handleInputChange, handleSubmit } = useFormInputHandle(
    {
      username,
      password,
    },
    async () => {
      console.log('createItem?', inputs, 'us/pass:', username, '/', password);

      setUsername(inputs.username);
      setPassword(inputs.password);
    },
    [username, password],
  );

  useEffect(() => {
    async function signIn() {
      try {
        console.log('Trying');
        const signInData = await Auth.signIn(username, password);
        console.log('Tried', signInData, signInData.username);
        if (signInData && signInData.username) {
          setAuthState('signedIn');
        }
        return signInData;
      } catch (error) {
        console.log('error signing in', error);
        throw error;
      }
    }

    if (username && password) {
      signIn();
      console.log('sign in?');
    }

    console.log('inside useeffect');
  }, [username, password, setAuthState]);

  // eslint-disable-next-line
  function resetForm() {
    setInputs();
  }

  console.log('props', AmplifySignIn);

  return (
    <div className="p-4 d-flex justify-content-center" slot="sign-in">
      <div>
        <form slot="sign-in">
          <h4 slot="headerText">Form</h4>
          <div className="form-group">
            <label htmlFor="username">
              Email address
              <input
                id="username"
                key="username"
                name="username"
                value={inputs.username}
                onChange={handleInputChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                key="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
                className="form-control"
              />
            </label>
          </div>
          <button
            type="submit"
            slot="confirm-sign-in"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomSignIn;
