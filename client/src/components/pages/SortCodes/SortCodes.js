import React, { useState, useRef, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import ButtonIcon from '../../Button/ButtonIcon';
import Table from '../../Table/Table';
import EditSortCodePopup from './EditSortCodePopup';
import css from './sortCodes.module.css';
import Sidebars from '../../Sidebars/Sidebars';
import { FiEdit, FiSave } from 'react-icons/fi';
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
  const refName = useRef(null);
  const refNum = useRef(null);
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [addColumn, setAddColumn] = useState([
    ...sortCodeColumn,
    {
      Header: '',
      accessor: 'icon',
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
  ]);

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

  return (
    <div className='body'>
      <Sidebars />
      <Header title='הגדרת קודי מיון' />
      <ToastContainer />
      <main>
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
            <Button
              text='הוספה'
              isDisable={!checkCusName(codeName) || !numbersOnly(codeNum)}
              fun={addSortCode}
            />
          </form>
        </div>
        {editPopup && <EditSortCodePopup setDisplay={setAditPopup} selectedRow={selectedRow} dataChange={setDataIsChanged}/>}
        <Table myData={dataTable} myColumns={addColumn} />
      </main>
      <Footer />
    </div>
  );
}
