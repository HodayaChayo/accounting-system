import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { workerColumns } from './workerTableColumns';
import Header from '../../Header/Header';
import Sidebars from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import AddWorkerSettings from './AddWorkerSettings';
import Table from '../../Table/Table';
import { FiEdit } from 'react-icons/fi';
import ButtonIcon from '../../Button/ButtonIcon';

export default function WorkerSettings() {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [dataIsChanged, setDataIsChanged] = useState(0);
  const [workerArr, setWorkerArr] = useState([]);

  const [columns, setColumns] = useState([
    ...workerColumns,
    {
      Header: '',
      accessor: 'edit',
      disableFilters: true,
      Cell: ({ row }) => (
        <ButtonIcon
          src={<FiEdit />}
          fun={() => {
            // setSelectedRow(row.original);
            // setAditPopup(true);
          }}
        />
      ),
    },
  ]);

  useEffect(() => {
    fetch('/worker/getTableData', {
      method: 'POST',
      body: JSON.stringify(),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        setWorkerArr(res);
      });
  }, [dataIsChanged]);

  return (
    <div className='body'>
      <Header title='הגדרת עובדים' />
      <Sidebars />
      <ToastContainer />
      <main>
        <Button
          text='הוספת עובד'
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
        <Table myData={workerArr} myColumns={columns} />
      </main>
      <Footer />
    </div>
  );
}
