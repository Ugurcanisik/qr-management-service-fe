import { Outlet } from 'react-router-dom';
import ProductList from './ProductList';
import ProductUpdate from './ProductUpdate';
import ProductCreate from './ProductCreate';
import PageTransitions from '@/components/PageTransitions';

function ProductPage() {
    return (
        <PageTransitions>
            <Outlet />
        </PageTransitions>
    );
}

export {
    ProductPage,
    ProductList,
    ProductUpdate,
    ProductCreate
};
