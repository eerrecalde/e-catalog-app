import React, { useContext } from 'react';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Nav from '../components/nav';
import { adminRoutes as routes } from '../routes/adminReoutes';
import CustomSignIn from '../components/custom-sign-in';
import { AuthContext } from '../context';

function Admin(props) {
  console.log(props);
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  console.log('routes', routes);
  return (
    <div className="admin">
      <pre>{authState}</pre>
      <AmplifyAuthenticator>
        <p>Inside auth</p>
        <Nav routes={routes} isAdmin />
        <Switch>
          {routes.map(({ path, component: Component }) => (
            <Route exact key={path} path={path}>
              <Component />
            </Route>
          ))}
          <Route path="*">
            <Redirect
              to={{
                pathname: '/admin/dashboard',
                state: { from: location },
              }}
            />
          </Route>
        </Switch>
        {/* {authState === 'signedIn' ? '' : <CustomSignIn slot="sign-in" onSignedIn={onSignedIn} />} */}
        <CustomSignIn slot="sign-in" />
      </AmplifyAuthenticator>
    </div>
  );
}

// export default withAuthenticator(Admin);
export default Admin;
