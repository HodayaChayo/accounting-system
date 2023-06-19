import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Sidebars from '../../Sidebars/Sidebars';
import { accountsColumns } from './accountsTableColumns';
import Table from '../../Table/Table';
import Button from '../../Button/Button';
import AccountPopup from './AccountPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Accounts() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [dataTable, setDataTable] = useState([]);
  const [dataChanged, setDataChanged] = useState(0);
  const [displayPopup, setDisplayPopup] = useState(false);

  // get accounts table data from server
  useEffect(() => {
    fetch('/accounts/getAccountsTable', {
      method: 'POST',
      body: JSON.stringify(thisVatId),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setDataTable(res)
      });
  }, [dataChanged]);

  return (
    <div className='body'>
      <Header title='הגדרת חשבונות' />
      <Sidebars />
      <Button
        text='הוספה'
        fun={() => {
          setDisplayPopup(true);
        }}
      />
      {displayPopup && <AccountPopup setDisplay={setDisplayPopup} dataChange={setDataChanged}/>}
      <ToastContainer />
      <Table myData={dataTable} myColumns={accountsColumns} />
    </div>
  );
}
