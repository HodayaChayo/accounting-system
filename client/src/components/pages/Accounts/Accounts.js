import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Sidebars from '../../Sidebars/Sidebars';
import { accountsColumns } from './accountsTableColumns';
import Table from '../../Table/Table';
import Button from '../../Button/Button';
import ButtonIcon from '../../Button/ButtonIcon';
import AddAccountPopup from './AddAccountPopup';
import EditAccountPopup from './EditAccountPopup';
import AlertDialog from '../../AlertDialog/AlertDialog';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Accounts() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [dataTable, setDataTable] = useState([]);
  const [dataChanged, setDataChanged] = useState(0);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setAditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const [columns, setColumns] = useState([
    ...accountsColumns,
    {
      Header: '',
      accessor: 'edit',
      disableFilters: true,
      Cell: ({ row }) => (
        <ButtonIcon
          src={<FiEdit />}
          fun={() => {
            setSelectedRow(row.original);
            setAditPopup(true);
          }}
        />
      ),
    },
    {
      Header: '',
      accessor: 'delete',
      disableFilters: true,
      Cell: ({ row }) => (
        <ButtonIcon
          src={<MdOutlineDeleteForever />}
          fun={() => {
            setSelectedRow(row.original);
            setDeletePopup(true);
          }}
        />
      ),
    },
  ]);

  // get accounts table data from server
  useEffect(() => {
    fetch('/accounts/getAccountsTable', {
      method: 'POST',
      body: JSON.stringify(thisVatId),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setDataTable(res);
      });
  }, [dataChanged]);

  const deleteAccount = () => {
    const number = selectedRow.number
    fetch('/accounts/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId,  number}),
    })
      .then(res => res.json())
      .then(res => {
        if(res.isDeleted){
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setDeletePopup(false)
          setDataChanged(prevValue => prevValue + 1)
        }else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <div className='body'>
      <Header title='הגדרת חשבונות' />
      <Sidebars />
      <Button
        text='הוספה'
        fun={() => {
          setAddPopup(true);
        }}
      />
      {addPopup && (
        <AddAccountPopup setDisplay={setAddPopup} dataChange={setDataChanged} />
      )}
      {editPopup && (
        <EditAccountPopup
          setDisplay={setAditPopup}
          dataChange={setDataChanged}
          selectedRow={selectedRow}
        />
      )}
      {deletePopup && (
        <AlertDialog
          title='מחיקת חשבון'
          text={`האם למחוק את חשבון: ${selectedRow.number} - ${selectedRow.name}? 
          לתשומת ליבך לא ניתן למחוק חשבון אם הוא מכיל פקודות.`}
          setDisplay={setDeletePopup}
          btnText='מחק'
          fun={deleteAccount}
        />
      )}
      <ToastContainer />
      <Table myData={dataTable} myColumns={columns} />
      <main></main>
      <Footer/>
    </div>
  );
}
