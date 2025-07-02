import Home from './pages/Home';
import Activity from './pages/admin/dashboard/Activity';
import Products from './pages/admin/dashboard/Products';
import Productsid from './pages/admin/crud/Products';

const AppRoutes = [
    { path: '/', element: <Home /> },
    { path: '/home', redirect: "/" },
    { path: '/dashboard', element: <Activity /> },
    { path: '/products', element: <Products /> },
    { path: '/products/:id', element: <Productsid /> },
    { path: '*', element: <></> },
];

export default AppRoutes;