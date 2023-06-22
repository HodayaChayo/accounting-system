import React from 'react';
import ButtonIcon from '../../Button/ButtonIcon';
import { FiEdit } from 'react-icons/fi';
export const cusColumns = [
  {
    Header: 'שם עוסק',
    accessor: 'name',
    Cell: ({ row }) => (
      <a
        onClick={() => {
          localStorage.setItem('SelectedCus', row.original.user_name);
          localStorage.setItem('CusVAT_Id', row.original.id_vat_num);
          localStorage.setItem('CusName', row.original.name)
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
