import { Outlet } from 'react-router-dom';
import CategoryList from './CategoryList';
import CategoryUpdate from './CategoryUpdate';
import CategoryCreate from './CategoryCreate';
import PageTransitions from '@/components/PageTransitions';

function CategoryPage() {
    return (
        <PageTransitions>
            <Outlet />
        </PageTransitions>
    );
}

export {
    CategoryPage,
    CategoryList,
    CategoryUpdate,
    CategoryCreate
};
