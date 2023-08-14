import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import css from './displayDocuments.module.css'
import myPhoto from '../pages/ReceivingDocuments/mahat_tests_search (1).pdf';


export default function() {
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
    <div className={css.container}>
      <Document file={myPhoto} onLoadSuccess={onDocumentLoadSuccess}>
        <Page height={500} pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button type='button' disabled={pageNumber <= 1} onClick={previousPage}>
        Previous
      </button>
      <button
        type='button'
        disabled={pageNumber >= numPages}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}
