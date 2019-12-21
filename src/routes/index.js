import Catalog from '../views/catalog';
import About from '../views/about';
import ItemCreate from '../views/item-create';
import ItemView from '../views/item-view';

export const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/item-create',
    name: 'Item Create',
    component: ItemCreate,
    hidden: true,
  },
  {
    path: '/item-view/:id',
    name: 'Item View',
    component: ItemView,
    hidden: true,
  },
];

export default routes;
