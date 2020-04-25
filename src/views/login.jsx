import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { adminRoutes as routes } from '../routes/adminReoutes';
import CustomSignIn from '../components/custom-sign-in';
import { AuthContext } from '../context';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (authState === 'signedIn') {
      history.replace(from);
    }
  });

  console.log('routes', routes);
  return (
    <div className="login">
      <CustomSignIn />
    </div>
  );
}

export default Login;
