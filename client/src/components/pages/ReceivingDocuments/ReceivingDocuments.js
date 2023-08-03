import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

export default function ReceivingDocuments(props) {
  return (
    <div className='body'>
      <Sidebar />
      <Header title='קליטת מסמכים' />
      <main>
        <div>
          <select placeholder='סוג מסמך' name='documentType' id=''></select>
          <input
            type='text'
            name='InvoiceNumber'
            placeholder='מספר חשבונית'
            maxLength={20}
            // onChange={e => setPassword(e.target.value)}
          ></input>
          <input
            type='date'
            name='date'
            placeholder='תאריך'
            maxLength={20}
            // onChange={e => setPassword(e.target.value)}
          ></input>
          <input
            type='text'
            name='InvoiceAmount'
            placeholder='סכום כולל מע"מ'
            maxLength={20}
            // onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
      </main>
      <Footer />
    </div>
  );
}
