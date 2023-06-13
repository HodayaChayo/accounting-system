import React from 'react';
export const cusColumns = [
  {
    Header: 'שם עוסק',
    accessor: 'name',
    Cell: ({ row }) => (
      <a
        onClick={() => {
          localStorage.setItem('SelectedCus', row.original.user_name);
        }}
        href={`/cusIndex`}
      >
        {row.original.name}
      </a>
    ),
  },
  {
    Header: 'מספר עוסק',
    accessor: 'id_vat_num',
  },
  {
    Header: 'סוג',
    accessor: 'business_type',
  },
  {
    Header: 'שם משתמש',
    accessor: 'user_name',
  },
];
