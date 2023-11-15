import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Table from '../../Table/Table';
import ButtonIcon from '../../Button/ButtonIcon';
import { FaImage } from 'react-icons/fa';
import Photo from '../../Photo/Photo';

export default function Archive() {
  const selectedCus = localStorage.getItem('SelectedCus');
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [displayPhoto, setDisplayPhoto] = useState(false);
  const [data, setData] = useState([]);
  const [doc, setDoc] = useState('?');
  const [columns, setColumns] = useState([
    {
      Header: 'מסמך',
      accessor: 'name',
      disableFilters: true,
      Cell: ({ row }) => (
        <ButtonIcon
          src={row.original.photo !== '' && <FaImage />}
          fun={() => {
            setSelectedPhoto(row.original.name);
            setDisplayPhoto(true);
          }}
        />
      ),
    },
    {
      Header: 'תאריך העלאה',
      accessor: 'upload_date',
    },
    {
      Header: 'תאריך קליטה',
      accessor: 'input_date',
    },
    {
      Header: 'הערות',
      accessor: 'note',
    },
  ]);

  useEffect(() => {
    fetch('/documents/archiveData', {
      method: 'POST',
      body: JSON.stringify({ selectedCus }),
    })
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    if (selectedPhoto !== '') {
      const selectedDoc = { name: selectedPhoto };
      fetch('/documents/getDoc', {
        method: 'POST',
        body: JSON.stringify({ selectedDoc }),
      })
        .then(res => (res.ok ? res.blob() : Promise.reject(res)))
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          // now do something with the URL
          console.log('what?', blobUrl);
          setDoc(blobUrl);
        });
    }
  }, [selectedPhoto]);

  return (
    <div className='body'>
      <Sidebars />
      <Header title='ארכיון' />
      {displayPhoto && doc !== '?' && <Photo doc={doc} setDisplay={setDisplayPhoto} />}
      <main>
        <Table myData={data} myColumns={columns} />
      </main>
      <Footer />
    </div>
  );
}
