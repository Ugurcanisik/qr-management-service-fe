import PageTransitions from '@/components/PageTransitions';
import { Card,  Title, Text, Grid} from '@mantine/core';
import useProductList from "@/hooks/useProductList.jsx";
import useCategoryList from "@/hooks/useCategoryList.jsx";

function DashboardPage() {

    const {products} = useProductList()
    const {category} = useCategoryList()

  return (
    <PageTransitions>
        <Grid mt="xs" gutter="xl">
            <Grid.Col md={6}>
                <Card component="a" shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={2} align="center" weight="bold" color="#0156a5">
                        Toplam Kategori
                    </Title>
                    <Text mt="xl" ml={"110px"} align="center" weight="bold" size="5vh">
                        {category.length ||0}
                        <Text weight="bold" style={{ display: 'inline' }} size="xl" mr="10vh"> adet</Text>
                    </Text>
                </Card>
            </Grid.Col>
            <Grid.Col md={6}>
                <Card component="a" shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={2} align="center" weight="bold" color="#0156a5">
                        Toplam Ürün
                    </Title>
                    <Text mt="xl" ml={"110px"} align="center" weight="bold" size="5vh">
                        {products.length|| 0}
                        <Text weight="bold" style={{ display: 'inline' }} size="xl" mr="10vh"> adet</Text>
                    </Text>
                </Card>
            </Grid.Col>
        </Grid>
    </PageTransitions>
  );
}

export default DashboardPage;
