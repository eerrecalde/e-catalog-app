import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { adminRoutes as routes } from '../routes/adminReoutes';
// import CustomSignIn from '../components/amplify-custom-components/custom-sign-in';
import { AuthContext } from '../context';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { authState, setAuthState } = useContext(AuthContext);
  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (authState === 'signedIn') {
      history.replace(from);
    }
  });

  function handleAuthStateChange(currAuthState) {
    if (currAuthState === 'signedin') {
      setAuthState('signedIn');
    }
  }

  console.log('routes', routes);
  return (
    <div className="main-container login">
      <AmplifyAuthenticator>
        <div slot="sign-in" className="d-flex justify-content-center p-4">
          <AmplifySignIn
            headerText="My Custom Sign In Text"
            slot="sign-in"
            handleAuthStateChange={handleAuthStateChange}
          />
        </div>
      </AmplifyAuthenticator>
    </div>
  );
}

export default Login;
