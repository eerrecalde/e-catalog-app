import Catalog from '../views/catalog';
import About from '../views/about';
import ItemView from '../views/item-view';
import Admin from '../views/admin';
import Login from '../views/login';
import NoMatch from '../views/no-match';

export const routes = [
  {
    path: '/catalog/:id',
    name: 'Catalog',
    component: Catalog,
  },
  {
    path: '/',
    name: 'About',
    component: About,
  },
  {
    path: '/item-view/:id',
    name: 'Item View',
    component: ItemView,
    isHidden: true,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    isHidden: true,
  },
  {
    path: '*',
    name: 'No Match',
    component: NoMatch,
    isHidden: true,
  },
];

export default routes;
