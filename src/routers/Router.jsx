import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
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
import ContactUs from '../pages/Contact';
import ProductDetails from '../pages/ProductDetails';
import Privacy from '../pages/Privacy';
import TermsOfUse from '../pages/TermsOfUse';
import Cookie from '../pages/Cookie';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ErrorPage from '../pages/ErrorPage';
import ManageProducts from '../pages/ManageProducts';
import ProductForm from '../pages/ProductForm';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import MyOrders from '../pages/MyOrders';
import StripePayment from '../pages/StripePayment';
import OrderDetails from '../pages/OrderDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      // Auth Routes at root level
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:resettoken',
        element: <ResetPassword />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:slug',
        element: <ProductDetails />,
      },
      {
        path: 'madhupur',
        element: <MadhupurBranch />,
      },
      {
        path: 'dhanbari',
        element: <DhanbariBranch />
      },
      {
        path: 'contact',
        element: <ContactUs />
      },
      {
        path: 'privacy-policy',
        element: <Privacy />
      },
      {
        path: 'terms-of-use',
        element: <TermsOfUse />
      },
      {
        path: 'cookie-policy',
        element: <Cookie />
      },
      {
        path: 'cart',
        element: <PrivateRoute><Cart /></PrivateRoute>
      },
      {
        path: 'wishlist',
        element: <PrivateRoute><Wishlist /></PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: 'orders',
        element: <PrivateRoute><MyOrders /></PrivateRoute>
      },
      {
        path: 'order-confirmation',
        element: <PrivateRoute><OrderConfirmation /></PrivateRoute>
      },
      {
        path: 'payment/stripe',
        element: <PrivateRoute><StripePayment /></PrivateRoute>
      },
      {
        path: 'orders/:id',
        element: <PrivateRoute><OrderDetails /></PrivateRoute>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
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
    path: '/admin',
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'products',
        element: <ManageProducts />
      },
      {
        path: 'products/new',
        element: <ProductForm />
      },
      {
        path: 'products/:id/edit',
        element: <ProductForm />
      }
    ]
  }
]);

export default router;
