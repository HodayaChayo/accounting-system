import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import AddCommandType from './AddCommandType';
import Button from '../../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../../Table/Table';

export default function commandType() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [displayAdd, setDisplayAdd] = useState(false);
  const [dataIsChanged, setDataIsChanged] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const commandTypeColumns = [
    {
      Header: 'קוד פקודה',
      accessor: 'code',
    },
    {
      Header: 'תיאור פקודה',
      accessor: 'name',
    },
  ];

  useEffect(() => {
    fetch('/commandType/getTableData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log('get data');
        // console.log(res);
        setDataTable(res);
      });
  }, [dataIsChanged]);

  return (
    <div className='body'>
      <Header title='סוגיי פקודה' />
      <Sidebars />
      <ToastContainer />
      <Button
        text='הוספת סוג פקודה'
        fun={() => {
          setDisplayAdd(true);
        }}
      />
      {displayAdd && <AddCommandType display={setDisplayAdd} dataChange={setDataIsChanged} />}
      <Table myData={dataTable} myColumns={commandTypeColumns}/>
    </div>
  );
}
