import { Navigate } from 'react-router-dom';
import Login from '@/pages/Login';

const PublicRoutes = [
  {
    path: '/login',
    exact: true,
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='app' />
  }
];

export default PublicRoutes;
