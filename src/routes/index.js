import Catalog from '../views/catalog';
import About from '../views/about';
import ItemCreate from '../views/item-create';
import ItemView from '../views/item-view';
import ItemUpdate from '../views/item-update';

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
  {
    path: '/item-update/:id',
    name: 'Item Update',
    component: ItemUpdate,
    hidden: true,
  },
];

export default routes;
