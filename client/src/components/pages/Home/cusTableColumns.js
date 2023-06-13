import React from 'react';
import { Link } from 'react-router-dom';
export const cusColumns = [
  {
    Header: 'שם עוסק',
    accessor: 'name',
    Cell: ({ row }) => (
      <Link to={`/details/${row.original.id}`}>{row.original.name}</Link>
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
