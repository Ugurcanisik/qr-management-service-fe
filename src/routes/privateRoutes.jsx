import { Navigate } from 'react-router-dom';
import Page from '@/layouts/Page';
import Dashboard from '@/pages/Dashboard'
import { CategoryPage, CategoryList, CategoryUpdate, CategoryCreate } from '@/pages/Category'
import { ProductPage, ProductList, ProductCreate, ProductUpdate } from '@/pages/Product'
import { UserCreate, UserList, UserPage, UserUpdate } from '@/pages/User'

const PrivateRoutes = [
  {
    path: '/',
    element: <Page />,
    children: [
      {
        path: '',
        element: <Navigate to='app' />
      },
      {
        path: '/app',
        element: <Dashboard />
      },
      {
        path: '/category',
        element: <CategoryPage />,
        children: [
          {
            index: true,
            element: <CategoryList />
          },
          {
            path: 'create',
            element: <CategoryCreate />
          },
          {
            path: ':categoryNumber',
            element: <CategoryUpdate />
          }
        ]
      },
      {
        path: '/product',
        element: <ProductPage />,
        children: [
          {
            index: true,
            element: <ProductList />
          },
          {
            path: 'create',
            element: <ProductCreate />
          },
          {
            path: ':productNumber',
            element: <ProductUpdate />
          }
        ]
      },
      {
        path: '/user',
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <UserList />
          },
          {
            path: 'create',
            element: <UserCreate />
          },
          {
            path: ':userNumber',
            element: <UserUpdate />
          }
        ]
      }
    ]
  }
];

export default PrivateRoutes;
