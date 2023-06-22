import React, { useState } from 'react';
import ButtonIcon from '../../Button/ButtonIcon';
import { FiEdit, FiSave } from 'react-icons/fi';
import {BiSolidReport} from 'react-icons/bi'

let editOrSave = false
let icon = <FiEdit/>

const onClickIcon = (row)=>{
  console.log('change icon');
  editOrSave = !editOrSave

  if(editOrSave){
    icon = <FiSave/>
  }
  else{
    icon = <FiEdit/>
  }
  console.log(editOrSave, ',', icon);
}


export const sortCodeColumn = [ 
  {
    Header: 'מספר קוד',
    accessor: 'number',
  },
  {
    Header: 'שם קוד',
    accessor: 'name',
  },
  // {
  //   Header: '',
  //   accessor: 'icon',
  //   disableFilters: true,
  //   Cell: ({ row }) => (
  //     <ButtonIcon src={icon} fun={onClickIcon} />
  //   ),
  // },
];
