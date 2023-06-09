import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Table from '../../Table/Table';
import Button from '../../Button/Button';
import AddCustomer from './AddCustomer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Home() {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios(
      'https://giftea.github.io/proj-data/mock.json'
    ).catch(err => console.log(err));
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Table mockData={data}/>
      </main>
      <Footer />
    </div>
  );
}
