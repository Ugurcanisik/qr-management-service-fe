import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { joiResolver, useForm } from '@mantine/form';
import {
    Button, Card, Grid, Group, Select, Switch, TextInput, Title
} from '@mantine/core';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay/index.jsx';
import useProduct from '@/hooks/useProduct';
import { errorNotification, successNotification } from '@/helpers/notification.jsx';
import Joi from 'joi';
import {updateProduct} from "@/services/products";
import useCategoryList from "@/hooks/useCategoryList";

function ProductUpdate() {
    const navigate = useNavigate();
    const { productNumber } = useParams();
    const [updateLoading, setUpdateLoading] = useState(false);

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

    const productUpdateForm = useForm({
        initialValues: {},
        validate: joiResolver(schema)
    });

    const { product, loading, error } = useProduct(productNumber);

    const [isActive, setIsActive] = useState(false)

    const {category} = useCategoryList();

    useEffect(() => {
        if (product && category) {
            productUpdateForm.setValues({
                name: product.name,
                price:product.price,
                rank: product.rank,
                imageUrl:product.imageUrl,
                description:product.description,
                categoryNumber:product.categoryNumber
            });
            setIsActive(product.isActive)
        }
    }, [product,category]);

    useEffect(() => {
        if (error) {
            errorNotification(error);
            navigate('/product');
        }
    }, [error]);

    const onSubmit = async (payload) => {
        try {
            setUpdateLoading(true);
            await updateProduct(productNumber, { ...payload, isActive });
            successNotification({
                message: 'Ürün güncelleme Başarılı'
            });
        } catch (err) {
            errorNotification({
                message: 'Ürün güncelleme Başarısız'
            });
        } finally {
            setUpdateLoading(false);
        }
    };


    return (
        <PageTransitions>
            <Title order={1} mb='md'>Ürün Güncelle</Title>
            <form onSubmit={productUpdateForm.onSubmit((values) => onSubmit(values))}>

                <Card shadow='sm' radius='1em' withBorder>
                    <CustomLoadingOverlay visible={loading || updateLoading} />
                    <Title order={3} mb='xl'>Ürün Bilgileri</Title>
                    <Grid>

                        <Grid.Col span={6}>
                            <TextInput description='Ürün Adı' {...productUpdateForm.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Fiyatı'
                                {...productUpdateForm.getInputProps('price')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                value={productUpdateForm.getInputProps.categoryNumber}
                                description='Kategori'
                                searchable
                                data={category.map((item)=>({
                                    value:item.categoryNumber,
                                    label:item.name
                                }))}
                                {...productUpdateForm.getInputProps('categoryNumber')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Resim Yolu'
                                {...productUpdateForm.getInputProps('imageUrl')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                description='Açıklama'
                                {...productUpdateForm.getInputProps('description')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                              description='Sırası'
                              {...productUpdateForm.getInputProps('rank')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Switch
                                ml={"180px"}
                                mt={"xl"}
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

export default ProductUpdate;
