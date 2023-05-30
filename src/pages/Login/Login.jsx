import {
  PasswordInput,
  Grid,
  Button,
  Center,
  Text,
  Box,
  Group,
  TextInput
} from '@mantine/core';
import {
  IconLock, IconEyeOff, IconEyeCheck, IconUser
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, setUser } from '@/redux/auth';
import { login } from '@/services/auth';
import PageTransitions from '@/components/PageTransitions';
import { errorNotification, successNotification } from '@/helpers/notification';
import { notificationMessages, api as apiConstant } from '@/constants';

function LoginPage() {
  const isAuth = useSelector(getAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      userName: '',
      password: ''
    },
    validate: {
      userName: (value) => (String(value).length > 1 ? null : 'Kullanıcı adı 4 karakterden kısa olamaz'),
      password: (value) => (String(value).length > 1 ? null : 'Şifre 4 karakter kısa olamaz!')
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate('/app');
    }
  }, [isAuth]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await login(data);
      successNotification({
        message: notificationMessages.LOGIN_SUCCESS
      });
      dispatch(setUser(response.data.data));
    } catch (err) {
      if (err?.response?.status === apiConstant.HTTP_401_UNAUTHORIZED) {
        errorNotification({
          message: notificationMessages.LOGIN_FAIL
        });
        return;
      }
      errorNotification({
        message: notificationMessages.UNEXPECTED_ERROR
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransitions>
      <Grid>
        <Grid.Col>
          <Center style={{ height: '100vh' }}>
            <Box>
              <Center>
                <Text
                  p={6}
                  sx={
                      (theme) => ({
                        color: theme.colors.blue[6],
                        fontWeight: 'bold',
                        fontSize: '40px'
                      })
                    }
                >
                  Giriş Ekranı
                </Text>
              </Center>
              <div>
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                  <TextInput
                    p={6}
                    icon={<IconUser />}
                    placeholder='Kulladını Adı'
                    size='lg'
                    radius='md'
                    {...form.getInputProps('userName')}
                  />
                  <PasswordInput
                    p={6}
                    icon={<IconLock />}
                    placeholder='Şifre'
                    size='lg'
                    radius='md'
                    {...form.getInputProps('password')}
                    visibilityToggleIcon={({ reveal, size }) => (reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />)}
                  />
                  <Group position='center'>
                    <Button
                      mt={'xs'}
                      loading={loading}
                      px={60}
                      variant='gradient'
                      size='md'
                      type='submit'
                    >
                      Giriş yap
                    </Button>
                  </Group>
                </form>
              </div>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
    </PageTransitions>
  );
}

export default LoginPage;
