import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory'
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainLayout from '../layouts/MainLayout';
import Orders from '../pages/Orders';
import Users from '../pages/Users';
import Transactions from '../pages/Transactions';
import Products from '../pages/Products';
import MadhupurBranch from '../pages/MadhupurBranch';
import DhanbariBranch from '../pages/DhanbariBranch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'madhupur',
        element: <MadhupurBranch />,
      },
      {
        path: 'dhanbari',
        element: <DhanbariBranch />
      }
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: 'inventory',
        element: <Inventory />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'transactions',
        element: <Transactions />
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  }
]);

export default router;
