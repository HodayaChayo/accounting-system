import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../Header/Header';
import Sidebars from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import AddWorkerSettings from './AddWorkerSettings';
import Table from '../../Table/Table'
import { FiEdit } from 'react-icons/fi';


export default function WorkerSettings(props) {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [dataIsChanged, setDataIsChanged] = useState(0);
  const [workerArr, setWorkerArr] = useState([]);

    // const [columns, setColumns] = useState([
    //   ...accountsColumns,
    //   {
    //     Header: '',
    //     accessor: 'edit',
    //     disableFilters: true,
    //     Cell: ({ row }) => (
    //       <ButtonIcon
    //         src={<FiEdit />}
    //         fun={() => {
    //           // setSelectedRow(row.original);
    //           // setAditPopup(true);
    //         }}
    //       />
    //     ),
    //   },
    // ]);


useEffect(() => {
  fetch('/worker/getTableData', {
    method: 'POST',
    body: JSON.stringify(),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setWorkerArr(res);
    });
}, []);


  return (
    <div className='body'>
      <Header title='הגדרת עובדים' />
      <Sidebars />
      <ToastContainer/>
      {/* <Table/> */}
      <main>
        <Button
          text='הוספת לקוח'
          fun={() => {
            setDisplayAdd(true);
          }}
        />
        {displayAdd && (
          <AddWorkerSettings
            display={setDisplayAdd}
            dataChange={setDataIsChanged}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
