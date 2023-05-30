import CustomDataTable from '@/components/CustomDataTable';
import TableDetailButton from '@/components/TableDetailButton';
import { useEffect } from 'react';
import { errorNotification } from '@/helpers/notification';
import useUserList from "@/hooks/useUserList.jsx";
import {deleteUser} from "@/services/user.jsx";



function UserList() {
    const columns = [
        {
            name: 'Adı',
            selector: (row) => row.firstName,
            center: true,
            sortable: true
        },
        {
            name: 'Soyadı',
            selector: (row) => row.lastName,
            center: true,
            sortable: true
        },
        {
            name: 'Kullanıcı Adı',
            selector: (row) => row.userName,
            center: true,
            sortable: true
        },
        {
            name: 'Aktif/Pasif',
            selector: (row) => row.isActive ? 'Aktif' : 'Pasif',
            center: true
        },
        {
            name: 'Güncelle',
            selector: (row) => (<TableDetailButton
                url={`${row.userNumber}`}
                deletedOnChange={() => {
                    deleteUser(row.userNumber)
                        .then(()=>{
                            refreshData()
                        })
                }}
            />),
            center: true
        }
    ];
    const { users, error, fetching,refreshData } = useUserList();

    useEffect(() => {
        if (error) {
            errorNotification(error);
        }
    }, [error]);

    return (
        <CustomDataTable
          tableColumns={columns}
          data={users}
          fetching={fetching}
          addTitle={'Kullanıcı Ekle'}
        />
    );
}

export default UserList;
