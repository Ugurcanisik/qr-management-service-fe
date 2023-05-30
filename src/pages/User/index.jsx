import { Outlet } from 'react-router-dom';
import UserList from './UserList';
import UserUpdate from './UserUpdate';
import UserCreate from './UserCreate';
import PageTransitions from '@/components/PageTransitions';

function UserPage() {
    return (
        <PageTransitions>
            <Outlet />
        </PageTransitions>
    );
}

export {
    UserPage,
    UserList,
    UserUpdate,
    UserCreate
};
