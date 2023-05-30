import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { joiResolver, useForm } from '@mantine/form';
import {
    Button, Card, Grid, Group, Switch, TextInput, Title
} from '@mantine/core';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay/index.jsx';
import useUser from '@/hooks/useUser';
import { errorNotification, successNotification } from '@/helpers/notification.jsx';
import { updateUser } from '@/services/user.jsx';
import Joi from 'joi';

function UserUpdate() {
    const navigate = useNavigate();
    const { userNumber } = useParams();
    const [updateLoading, setUpdateLoading] = useState(false);

    const schema = Joi.object({
        firstName: Joi.string().min(2).message('Ad zorunlu alan').required(),
        lastName: Joi.string().min(2).message('Soyisim zorunlu alan').required(),
        userName: Joi.string().min(2).message('kullanıcı Adı zorunlu alan').required(),
    });

    const userUpdateForm = useForm({
        initialValues: {},
        validate: joiResolver(schema)
    });

    const { user, loading, error } = useUser(userNumber);

    const [isActive, setIsActive] = useState(null)

    useEffect(() => {
        if (user) {
            userUpdateForm.setValues({
                firstName: user.firstName,
                lastName: user.lastName,
                userName:user.userName
            });
            setIsActive(user.isActive)
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            errorNotification(error);
            navigate('category');
        }
    }, [error]);

    const onSubmit = async (payload) => {
        try {
            setUpdateLoading(true);
            await updateUser(userNumber, { ...payload, isActive });
            successNotification({
                message: 'Kullanıcı güncelleme Başarılı'
            });
        } catch (err) {
            errorNotification({
                message: 'Kullanıcı güncelleme Başarısız'
            });
        } finally {
            setUpdateLoading(false);
        }
    };


    return (
        <PageTransitions>
            <Title order={1} mb='md'>Kullanıcı Güncelle</Title>
            <form onSubmit={userUpdateForm.onSubmit((values) => onSubmit(values))}>

                <Card shadow='sm' radius='1em' withBorder>
                    <CustomLoadingOverlay visible={loading || updateLoading} />
                    <Title order={3} mb='xl'>Kullanıcı Bilgileri</Title>
                    <Grid>

                        <Grid.Col span={6}>
                            <TextInput description='Adı' {...userUpdateForm.getInputProps('firstName')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput description='soyAdı' {...userUpdateForm.getInputProps('lastName')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput description='kullanıcı Adı' {...userUpdateForm.getInputProps('userName')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Switch
                                mt={"xl"}
                                ml={"180px"}
                                labelPosition={'left'}
                                label={'Aktif/Pasif'}
                              checked={isActive} size={"lg"} onChange={
(event) => {
setIsActive(event.currentTarget.checked)
                            }
} onLabel='Aktif' offLabel='Pasif' />
                        </Grid.Col>
                    </Grid>
                </Card>


                <Group position='center' mb='lg'>
                    <Button loading={loading || updateLoading} type='submit' mt='lg' style={{ width: '15em' }}>
                        Güncelle
                    </Button>
                </Group>

            </form>

        </PageTransitions>
    );
}

export default UserUpdate;
