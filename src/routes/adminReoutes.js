import ItemCreate from '../views/item-create';
import ItemUpdate from '../views/item-update';
import AdminDashboard from '../views/admin-dashboard';

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/item-create',
    name: 'Item Create',
    component: ItemCreate,
  },
  {
    path: '/admin/item-update/:id',
    name: 'Item Update',
    component: ItemUpdate,
    isHidden: true,
  },
];

export default adminRoutes;
