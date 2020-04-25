import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import { adminRoutes } from './routes/adminReoutes';

function RoutesSwitch() {
  return (
    <>
      <Switch>
        {routes.map(({ path, component: Component }) => (
          <Route exact={path === '/'} key={path} path={path}>
            {path.indexOf('/admin') > -1 ? <Component routes={adminRoutes} /> : <Component />}
          </Route>
        ))}
      </Switch>
    </>
  );
}

const Routes = () => <RoutesSwitch />;

export default Routes;
