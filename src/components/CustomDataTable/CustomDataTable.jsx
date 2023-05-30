import DataTable from 'react-data-table-component';
import { Box, Button, Center, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const CustomDataTable = ({ tableColumns = [], data, fetching, addTitle }) => {
    const navigate = useNavigate();
    return (
        <DataTable
          subHeader
          subHeaderComponent={
<Center mx={'auto'}>
    <Button onClick={
        () => {
            navigate('create')
        }
    }>{addTitle}
    </Button>
</Center>
}
          noDataComponent={<Box p={20}>Listeleme bilgisi bulunamadı. Yeni kayıt girdikten sonra tekrar kontrol ediniz.</Box>}
          progressPending={fetching}
          progressComponent={<Box p={10} mt='200px'><Loader /></Box>}
          persistTableHead
          pagination
          highlightOnHover
          columns={tableColumns}
          data={data}
          striped
          fixedHeader
          fixedHeaderScrollHeight='67vh'
        />
    )
}


export default CustomDataTable
