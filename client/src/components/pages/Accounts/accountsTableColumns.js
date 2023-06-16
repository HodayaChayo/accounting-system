import React from "react";
import ButtonIcon from "../../Button/ButtonIcon";
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md'

export const accountsColumns = [
  {
    Header: 'קוד מיון',
    accessor: 'sort_code',

  },
  {
    Header: 'מספר חשבון',
    accessor: 'number',
  },
  {
    Header: 'שם חשבון',
    accessor: 'name',
  },
  {
    Header: '',
    accessor: 'edit',
    disableFilters: true,
    Cell: ({ row }) => (
      <ButtonIcon src={<FiEdit/>}/>
    ),
  },
  {
    Header: '',
    accessor: 'delete',
    disableFilters: true,
    Cell: ({ row }) => (
      <ButtonIcon src={<MdOutlineDeleteForever/>}/>
    ),
  },

]