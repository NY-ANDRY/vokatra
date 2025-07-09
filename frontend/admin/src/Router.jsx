import Home from './pages/Home';
import Activity from './pages/admin/dashboard/Activity';
import Products from './pages/admin/dashboard/Products';
import Productsid from './pages/admin/crud/Products';
import Test from './pages/Test';
import Stock from './pages/admin/dashboard/Stock';

const AppRoutes = [
    { path: '/', element: <Home /> },
    { path: '/home', redirect: "/" },
    { path: '/dashboard', element: <Activity /> },
    { path: '/products', element: <Products /> },
    { path: '/products/:id', element: <Productsid /> },
    { path: '/stock', element: <Stock /> },
    { path: '/test', element: <Test /> },
    { path: '*', element: <></> },
];

export default AppRoutes;