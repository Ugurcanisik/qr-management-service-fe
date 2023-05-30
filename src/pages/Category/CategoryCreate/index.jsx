import { useState } from 'react';
import { joiResolver, useForm } from '@mantine/form';
import {
    Button, Card, Grid, Group, TextInput, Title
} from '@mantine/core';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay/index.jsx';
import { errorNotification, successNotification } from '@/helpers/notification.jsx';
import { createCategory } from '@/services/category';
import Joi from 'joi';
import {useNavigate} from "react-router-dom";

function CategoryCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const schema = Joi.object({
        name: Joi.string().min(2).message('kategori adı zorunlu alan')
.required(),
        rank: Joi.number().greater(-1)
            .message('sıralama -1 dan büyük olmalıdır')
    });

    const categoryUpdateForm = useForm({
        initialValues: {
            name: '',
            rank: 0
        },
        validate: joiResolver(schema)
    });

    const onSubmit = async (payload) => {
        try {
            setLoading(true);
            await createCategory(payload);
            successNotification({
                message: 'Kategori Ekleme Başarılı'
            });
            navigate('/category')
        } catch (err) {
            errorNotification({
                message: 'Kategori Ekleme Başarısız'
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <PageTransitions>
            <Title order={1} mb='md'>Kategori ekle</Title>
            <form onSubmit={categoryUpdateForm.onSubmit((values) => onSubmit(values))}>

                <Card shadow='sm' radius='1em' withBorder>
                    <CustomLoadingOverlay visible={loading} />
                    <Title order={3} mb='xl'>Kategori Bilgileri</Title>
                    <Grid>

                        <Grid.Col span={6}>
                            <TextInput description='Kategori Adı' {...categoryUpdateForm.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                              description='Sırası'
                              {...categoryUpdateForm.getInputProps('rank')}
                            />
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

export default CategoryCreate;
