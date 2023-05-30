import { useState } from 'react';
import { joiResolver, useForm } from '@mantine/form';
import {
    Button, Card, Grid, Group, Select, Switch, TextInput, Title
} from '@mantine/core';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay/index.jsx';
import { errorNotification, successNotification } from '@/helpers/notification.jsx';
import { createProduct } from '@/services/products';
import Joi from 'joi';
import useCategoryList from "@/hooks/useCategoryList.jsx";
import {useNavigate} from "react-router-dom";

function ProductCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const schema = Joi.object({
        name: Joi.string().min(2).message('kategori adı zorunlu alan')
            .required(),
        price:Joi.string().optional(),
        imageUrl:Joi.any().optional(),
        description:Joi.string().optional(),
        categoryNumber:Joi.string().optional(),
        rank: Joi.number().greater(-1)
            .message('sıralama 0 dan büyük olmalıdır')
    });

    const productCreateForm = useForm({
        initialValues: {
            name: '',
            price:'',
            rank: 0,
            imageUrl:'',
            description:'',
            categoryNumber:''
        },
        validate: joiResolver(schema)
    });

    const {category} = useCategoryList();


    const onSubmit = async (payload) => {
        try {
            setLoading(true);
            await createProduct(payload);
            successNotification({
                message: 'Kategori Ekleme Başarılı'
            });
            navigate('/product')
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
            <form onSubmit={productCreateForm.onSubmit((values) => onSubmit(values))}>

                <Card shadow='sm' radius='1em' withBorder>
                    <CustomLoadingOverlay visible={loading} />
                    <Title order={3} mb='xl'>Ürün Bilgileri</Title>
                    <Grid>

                        <Grid.Col span={6}>
                            <TextInput description='Ürün Adı' {...productCreateForm.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Fiyatı'
                                {...productCreateForm.getInputProps('price')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                description='Kategori'
                                searchable
                                data={category.map((item)=>({
                                    value:item.categoryNumber,
                                    label:item.name
                                }))}
                                {...productCreateForm.getInputProps('categoryNumber')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Resim Yolu'
                                {...productCreateForm.getInputProps('imageUrl')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Açıklama'
                                {...productCreateForm.getInputProps('description')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Sırası'
                                {...productCreateForm.getInputProps('rank')}
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

export default ProductCreate;
