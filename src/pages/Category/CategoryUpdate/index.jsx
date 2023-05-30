import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { joiResolver, useForm } from '@mantine/form';
import {
    Button, Card, Grid, Group, Switch, TextInput, Title
} from '@mantine/core';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay/index.jsx';
import useCategory from '@/hooks/useCategory';
import { errorNotification, successNotification } from '@/helpers/notification.jsx';
import { updateCategory } from '@/services/category';
import Joi from 'joi';

function CategoryUpdate() {
    const navigate = useNavigate();
    const { categoryNumber } = useParams();
    const [updateLoading, setUpdateLoading] = useState(false);

    const schema = Joi.object({
        name: Joi.string().min(2).message('kategori adı zorunlu alan')
.required(),
        rank: Joi.number().greater(-1)
            .message('sıralama 0 dan büyük olmalıdır')
    });

    const categoryUpdateForm = useForm({
        initialValues: {},
        validate: joiResolver(schema)
    });

    const { category, loading, error } = useCategory(categoryNumber);

    const [isActive, setIsActive] = useState(null)

    useEffect(() => {
        if (category) {
            categoryUpdateForm.setValues({
                name: category.name,
                rank: category.rank
            });
            setIsActive(category.isActive)
        }
    }, [category]);

    useEffect(() => {
        if (error) {
            errorNotification(error);
            navigate('category');
        }
    }, [error]);

    const onSubmit = async (payload) => {
        try {
            setUpdateLoading(true);
            await updateCategory(categoryNumber, { ...payload, isActive });
            successNotification({
                message: 'Kategori güncelleme Başarılı'
            });
        } catch (err) {
            errorNotification({
                message: 'Kategori güncelleme Başarısız'
            });
        } finally {
            setUpdateLoading(false);
        }
    };


    return (
        <PageTransitions>
            <Title order={1} mb='md'>Kategori Güncelle</Title>
            <form onSubmit={categoryUpdateForm.onSubmit((values) => onSubmit(values))}>

                <Card shadow='sm' radius='1em' withBorder>
                    <CustomLoadingOverlay visible={loading || updateLoading} />
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
                        <Grid.Col span={6}>
                            <Switch
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

export default CategoryUpdate;
