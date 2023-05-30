import { useRoutes } from 'react-router-dom';
import PrivateRoutes from './privateRoutes';
import PublicRoutes from './publicRoutes';

export const Router = () => useRoutes([...PrivateRoutes, ...PublicRoutes]);

