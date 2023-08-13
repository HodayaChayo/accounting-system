import React, { useState } from 'react';
// import SingleDocument from '../../DisplayDocuments/SingleDocument';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import myFile from './cv pdf.pdf';
import myPhoto from './photoo.jpg'
import Sidebar from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';


export default function ReceivingDocuments(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

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
        {/* <div>
          <SingleDocument file={myFile}/>
        </div> */}

        <div>
          <Document file={myFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </main>
      <Footer />
    </div>
  );
}
