import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Table from '../../Table/Table';
import Button from '../../Button/Button';
import AddCustomer from './AddCustomer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [displayAdd, setDisplayAdd] = useState(false);

  return (
    <div className='body'>
      <Header title='דף הבית' />

      <main>
        <Button
          text='הוספת לקוח'
          fun={() => {
            setDisplayAdd(true);
          }}
        />
        {displayAdd && <AddCustomer display={setDisplayAdd} />}
        <Table
          fieldsArr={['עוסק', 'מספר עוסק', 'סוג', 'פעיל', 'מסמכים לקליטה']}
        />
      </main>
      <Footer />
    </div>
  );
}
