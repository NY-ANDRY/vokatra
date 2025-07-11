import Home from './pages/Home';
import Activity from './pages/admin/dashboard/Activity';
import Products from './pages/Products';
import Productsid from './pages/Product';
import Pack from './pages/Packs';
import Test from './pages/Test';
import Panier from './pages/Panier';
import Commande from './pages/Commande';
import Commandes from './pages/Commandes';
import Facture from './pages/Facture';
import Factures from './pages/Factures';

const AppRoutes = [
    { path: '/', element: <Home /> },
    { path: '/home', redirect: "/" },
    // { path: '/dashboard', element: <Activity /> },
    { path: '/products', element: <Products /> },
    { path: '/products/:id', element: <Productsid /> },
    { path: '/packs', element: <Pack /> },
    { path: '/test', element: <Test /> },
    { path: '/panier', element: <Panier /> },
    { path: '/commandes', element: <Commandes /> },
    { path: '/commandes/:id', element: <Commande /> },
    { path: '/factures', element: <Factures /> },
    { path: '/factures/:id', element: <Facture /> },
    { path: '*', element: <></> },
];

export default AppRoutes;
