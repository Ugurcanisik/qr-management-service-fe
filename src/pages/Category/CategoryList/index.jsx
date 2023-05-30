import CustomDataTable from '@/components/CustomDataTable';
import TableDetailButton from '@/components/TableDetailButton';
import useCategoryList from '@/hooks/useCategoryList.jsx';
import { useEffect } from 'react';
import { errorNotification } from '@/helpers/notification';
import {deleteCategory} from "@/services/category.jsx";
import {useNavigate} from "react-router-dom";



function CategoryList() {

    const navigate = useNavigate();

    const { category, error, fetching,refreshData } = useCategoryList();



    const columns = [
        {
            name: 'Adı',
            selector: (row) => row.name,
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
            name: 'Güncelle',
            selector: (row) => (<TableDetailButton
                url={`${row.categoryNumber}`}
                deletedOnChange={() => {
                     deleteCategory(row.categoryNumber)
                         .then(()=>{
                             refreshData()
                         })
                }}
            />),
            center: true
        }
    ];




    useEffect(() => {
        if (error) {
            errorNotification(error);
        }
    }, [error]);

    return (
        <CustomDataTable
          tableColumns={columns}
          data={category}
          fetching={fetching}
          addTitle={'Kategori Ekle'}
        />
    );
}

export default CategoryList;
