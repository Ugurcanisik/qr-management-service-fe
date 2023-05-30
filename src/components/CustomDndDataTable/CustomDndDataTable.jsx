import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';

const Example = () => {
    const columns = useMemo(
        // column definitions...
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name'
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name'
            },
            {
                accessorKey: 'city',
                header: 'City'
            }
        ],
        []
        // end
    );

    const [data, setData] = useState(() => [
        {
            firstName: 'Dylan',
            lastName: 'Murray',
            city: 'East Daphne'
        },
        {
            firstName: 'Raquel',
            lastName: 'Kohler',
            city: 'Columbus'
        },
        {
            firstName: 'Ervin',
            lastName: 'Reinger',
            city: 'South Linda'
        },
        {
            firstName: 'Brittany',
            lastName: 'McCullough',
            city: 'Lincoln'
        },
        {
            firstName: 'Branson',
            lastName: 'Frami',
            city: 'Charleston'
        }
    ]);

    return (
        <MaterialReactTable
          autoResetPageIndex={false}
          columns={columns}
          data={data}
          enableRowOrdering
          enableSorting={false}
          muiTableBodyRowDragHandleProps={
({ table }) => ({
                onDragEnd: () => {
                    const { draggingRow, hoveredRow } = table.getState();
                    if (hoveredRow && draggingRow) {
                        data.splice(
                            hoveredRow.index,
                            0,
                            data.splice(draggingRow.index, 1)[0]
                        );
                        setData([...data]);
                    }
                }
            })
}
        />
    );
};

export default Example;
