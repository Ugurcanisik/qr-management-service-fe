import CustomDataTable from '@/components/CustomDataTable';
import TableDetailButton from '@/components/TableDetailButton';
import useProductList from '@/hooks/useProductList';
import { useEffect } from 'react';
import { errorNotification } from '@/helpers/notification';
import {deleteProduct} from "@/services/products";



function ProductList() {

    const columns = [
        {
            name: 'Adı',
            selector: (row) => row.name,
            center: true,
            sortable: true
        },
        {
            name: 'fiyatı',
            selector: (row) => row.price,
            center: true,
            sortable: true
        },
        {
            name: 'Aktif/Pasif',
            selector: (row) => row.isActive ? 'Aktif' : 'Pasif',
            center: true
        },
        {
            name: 'Sırası',
            selector: (row) => row.rank,
            center: true,
            sortable: true
        },
        {
            name: 'Kategori',
            selector: (row) => row.category.name,
            center: true,
            sortable: true
        },
        {
            name: 'Güncelle',
            selector: (row) => (<TableDetailButton
                url={`${row.productNumber}`}
                deletedOnChange={() => {
                    deleteProduct(row.productNumber)
                        .then(()=>{
                            refreshData()
                        })
                }}
            />),
            center: true
        }
    ];

    const { products, error, fetching,refreshData } = useProductList();

    useEffect(() => {
        if (error) {
            errorNotification(error);
        }
    }, [error]);

    return (
        <CustomDataTable
          tableColumns={columns}
          data={products}
          fetching={fetching}
          addTitle={'Ürün Ekle'}
        />
    );
}

export default ProductList;
