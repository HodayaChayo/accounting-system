import React from "react";
import ButtonIcon from "../../Button/ButtonIcon";
import { FiEdit } from 'react-icons/fi';
import Photo from "../../Photo/Photo";

export const ledgerReportColumns = [
  {
    Header: 'אינדקס',
    accessor: 'command_index',
  },
  {
    Header: 'תאריך',
    accessor: 'new_date',
  },
  {
    Header: 'סוג פקודה',
    accessor: 'command_type',
  },
  {
    Header: 'אסמכתה',
    accessor: 'reference',
  },
  {
    Header: 'סכום',
    accessor: 'amount',
  },
  {
    Header: 'מע"מ',
    accessor: 'other_amount',
  },
  {
    Header: 'חשבון נגדי',
    accessor: 'against_account',
  },
  // {
  //   Header: 'מסמך',
  //   accessor: 'photo',
  //   disableFilters: true,
  //   Cell: ({ row }) => (
  //     <ButtonIcon
  //       src={row.original.photo !== '' && <FiEdit />}
  //       fun={() => {
  //         console.log(row.original);
          
  //       }}
  //     />
  //   ),
  // },
  {
    Header: 'תאריך קליטה',
    accessor: 'new_input_date',
  },
  {
    Header: 'הערה',
    accessor: 'details',
  },
];
