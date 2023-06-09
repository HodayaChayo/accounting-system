import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Table from '../../Table/Table';
import Button from '../../Button/Button';
import AddCustomer from './AddCustomer';
import { cusColumns } from './cusTableColumns';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Home() {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   const { data } = await axios(
  //     'https://giftea.github.io/proj-data/mock.json'
  //   ).catch(err => console.log(err));
  //   setData(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const askCustomerData = () => {
    fetch('cusTable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(async res => res.json())
      .then(async res => {
        console.log(res);
        await setData(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='body'>
      <Header title='דף הבית' />
      <ToastContainer />
      <main>
        <Button
          text='הוספת לקוח'
          fun={() => {
            setDisplayAdd(true);
          }}
        />
        {displayAdd && <AddCustomer display={setDisplayAdd} />}
        {/* {askCustomerData()} */}
        <Table myData={data} myColumns={cusColumns} />
      </main>
      <Footer />
    </div>
  );
}
