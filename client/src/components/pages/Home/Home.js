import React from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Table from '../../Table/Table';
import Button from '../../Button/Button';
import AddCustomer from './AddCustomer';

export default function Home() {
  return (
    <div className='body'>
      <Header title='דף הבית' />

      <main>
        <Button text='הוספת לקוח'/>
        <AddCustomer/>
        <Table
          fieldsArr={['עוסק', 'מספר עוסק', 'סוג', 'פעיל', 'מסמכים לקליטה']}
        />
      </main>
      <Footer />
    </div>
  );
}
