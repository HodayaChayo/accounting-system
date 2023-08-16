import React, { useState } from 'react';
import DisplayDocuments from '../../DisplayDocuments/DisplayDocuments';
import PdfViewerComponent from '../../DisplayDocuments/PdfViewerComponent';

import css from './receivingDocuments.module.css';
import myFile from './cv pdf.pdf';
import myPhoto from './mahat_tests_search (1).pdf';
import Sidebar from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';


// const [documentType, setDocumentType] = useState('');
// const [doubt, setDoubt] = useState('');

export default function ReceivingDocuments(props) {
  return (
    <div className='body'>
      <Sidebar />
      <Header title='קליטת מסמכים' />
      <main className={css.allMain}>
        <div className={css.allInput}>
          <select name='doubt' id=''></select>
          <select name='TypeExpenditure' id=''></select>
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
          <input
            type='text'
            name='otherVAT'
            placeholder='מע"מ מאולץ'
            maxLength={20}
            // onChange={e => setPassword(e.target.value)}
          ></input>
          <textarea name='note' id='' cols='45' rows='10'></textarea>
          <button>קלוט</button>
        </div>
        <div className={css.pdf}>
          {/* <DisplayDocuments/> */}
          <PdfViewerComponent document={myFile} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
