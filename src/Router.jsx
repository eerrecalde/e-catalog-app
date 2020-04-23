import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/header';
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

const Routes = () => (
  <Router>
    <Header routes={routes} />
    <RoutesSwitch />
  </Router>
);

export default Routes;
