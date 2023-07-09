import React, { useState, useRef, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import MyButton from '../../Button/Button';
import ButtonIcon from '../../Button/ButtonIcon';
import Table from '../../Table/Table';
import EditSortCodePopup from './EditSortCodePopup';
import css from './sortCodes.module.css';
import Sidebars from '../../Sidebars/Sidebars';
import AlertDialog from '../../AlertDialog/AlertDialog';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { sortCodeColumn } from './sortCodeTableColumns';
import { ToastContainer, toast } from 'react-toastify';
import { checkCusName, numbersOnly } from '../../validations/validations';

export default function SortCodes() {
  const [codeNum, setCodeNum] = useState('');
  const [codeName, setCodeName] = useState('');
  const [dataIsChanged, setDataIsChanged] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [editPopup, setAditPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const refName = useRef(null);
  const refNum = useRef(null);
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [addColumn, setAddColumn] = useState([
    ...sortCodeColumn,
    {
      Header: '',
      accessor: 'update',
      disableFilters: true,
      Cell: ({ row }) => (
        <ButtonIcon
          src={<FiEdit />}
          fun={() => {
            setAditPopup(true);
            setSelectedRow(row.original);
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
            setDeleteDialog(true);
          }}
        />
      ),
    },
  ]);

  // used to clos delete sort code popup
  const handleClose = () => {
    setDeleteDialog(false);
  };

  // get the sort code table data from server
  useEffect(() => {
    fetch('/sortCode/getTableData', {
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

  // add sort code, return message if is added or error is already exist
  const addSortCode = () => {
    const codeNumber = Number(codeNum);
    fetch('/sortCode/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId, codeNumber, codeName }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          refName.current.value = '';
          refNum.current.value = '';
          setDataIsChanged(!dataIsChanged);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  // delete sort code
  const deleteSortCode = () => {
    const number = Number(selectedRow.number);
    fetch('/sortCode/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId, number }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.isDelete) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          handleClose();
          setDataIsChanged(!dataIsChanged);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <div className='body'>
      <Sidebars />
      <Header title='הגדרת קודי מיון' />
      <ToastContainer />

      <div className={css.addContainer}>
        <h4>הוספת קוד מיון:</h4>
        <form action=''>
          מספר:{' '}
          <input
            type='number'
            placeholder='מספר קוד מיון'
            onChange={e => {
              setCodeNum(e.target.value);
            }}
            ref={refNum}
          />
          שם:{' '}
          <input
            type='text'
            maxLength={20}
            placeholder='שם קוד מיון'
            onChange={e => {
              setCodeName(e.target.value);
            }}
            ref={refName}
          />
          <MyButton
            text='הוספה'
            isDisable={!checkCusName(codeName) || !numbersOnly(codeNum)}
            fun={addSortCode}
          />
        </form>
      </div>
      {editPopup && (
        <EditSortCodePopup
          setDisplay={setAditPopup}
          selectedRow={selectedRow}
          dataChange={setDataIsChanged}
        />
      )}
      {deleteDialog && (
        <AlertDialog
          title='מחיקת קוד מיון'
          text={`האם למחוק קוד מיון: ${selectedRow.number} - ${selectedRow.name}?
            לתשומת ליבך לא ניתן למחוק קוד מיון אם משוייכים אליו חשבונות`}
          setDisplay={setDeleteDialog}
          btnText='מחק'
          fun={deleteSortCode}
        />
      )}
      <Table myData={dataTable} myColumns={addColumn} />
      <main></main>
      <Footer/>
    </div>
  );
}
