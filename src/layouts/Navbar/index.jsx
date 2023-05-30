import { Navbar, Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavbarLink from './NavbarLink';
import { clearAuth } from '@/redux/auth';
import paths from './NavbarPath';

function CustomNavBar() {
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearAuth());
    };

    const links = paths.map((item) => (
        <NavbarLink
          path={item.path}
          label={item.label}
          key={item.path}
          active={item.path === location.pathname}
          {...item}
        />
    ));

    return (
        <Navbar width={{ base: 80 }} p='md'>
            <Navbar.Section grow>
                <Stack justify='center' spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section mb='xl'>
                <Stack justify='center' spacing={0}>
                    <NavbarLink icon={IconLogout} active={false} label='Çıkış Yap' path='/login' onClick={logout} />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}

export default CustomNavBar;
