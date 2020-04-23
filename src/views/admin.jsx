import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Nav from '../components/nav';
import { adminRoutes as routes } from '../routes/adminReoutes';

function Admin() {
  const location = useLocation();

  console.log('routes', routes);
  return (
    <div className="admin">
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
    </div>
  );
}

export default withAuthenticator(Admin);
// export default Admin;
