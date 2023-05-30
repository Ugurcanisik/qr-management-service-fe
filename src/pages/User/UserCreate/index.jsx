import { useState } from 'react';
import { joiResolver, useForm } from '@mantine/form';
import {
    Button, Card, Grid, Group, TextInput, Title
} from '@mantine/core';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay/index.jsx';
import { errorNotification, successNotification } from '@/helpers/notification.jsx';
import { createUser } from '@/services/user.jsx';
import Joi from 'joi';
import {useNavigate} from "react-router-dom";

function UserCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).message('Soyad zorunlu alan').required(),
        userName: Joi.string().min(2).message('Kullanıcı adı zorunlu alan').required(),
        password: Joi.string().min(2).message('Şifre zorunlu alan').required(),
    });

    const userCreateForm = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            userName:'',
            password:''
        },
        validate: joiResolver(schema)
    });

    const onSubmit = async (payload) => {
        try {
            setLoading(true);
            await createUser(payload);
            successNotification({
                message: 'Kullanıcı Ekleme Başarılı'
            });
            navigate('/user')
        } catch (err) {
            errorNotification({
                message: 'Kullanıcı Ekleme Başarısız'
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <PageTransitions>
            <Title order={1} mb='md'>Kullanıcı ekle</Title>
            <form onSubmit={userCreateForm.onSubmit((values) => onSubmit(values))}>

                <Card shadow='sm' radius='1em' withBorder>
                    <CustomLoadingOverlay visible={loading} />
                    <Title order={3} mb='xl'>Kullanıcı Bilgileri</Title>
                    <Grid>

                        <Grid.Col span={6}>
                            <TextInput description='Adı' {...userCreateForm.getInputProps('firstName')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput description='soyAdı' {...userCreateForm.getInputProps('lastName')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput description='kullanıcı Adı' {...userCreateForm.getInputProps('userName')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput description='Şifre' {...userCreateForm.getInputProps('password')} />
                        </Grid.Col>
                    </Grid>
                </Card>



                <Group position='center' mb='lg'>
                    <Button loading={loading} type='submit' mt='lg' style={{ width: '15em' }}>
                        Kaydet
                    </Button>
                </Group>

            </form>

        </PageTransitions>
    );
}

export default UserCreate;
