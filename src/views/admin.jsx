import React, { useContext } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Nav from '../components/nav';
import { adminRoutes as routes } from '../routes/adminReoutes';
import { AuthContext } from '../context';

function Admin() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  console.log('authState', authState);

  console.log('routes', routes);
  return (
    <div className="main-container admin">
      {authState ? (
        <>
          <Nav routes={routes} isAdmin />
          <Switch>
            {authState === 'signedIn' ? (
              routes.map(({ path, component: Component }) => (
                <Route exact key={path} path={path}>
                  <Component />
                </Route>
              ))
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )}
            <Route path="*">
              <Redirect
                to={{
                  pathname: '/admin/dashboard',
                  state: { from: location },
                }}
              />
            </Route>
          </Switch>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

// export default withAuthenticator(Admin);
export default Admin;
