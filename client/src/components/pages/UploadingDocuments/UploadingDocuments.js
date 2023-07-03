import React, { useState } from 'react';
import Button from '../../Button/Button';
import css from './uploadingDocuments.module.css';
import Footer from '../../Footer/Footer';
import Sidebar from '../../Sidebars/Sidebars';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

export default function UploadingDocuments(props) {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [errorFiles, setErrorFiles] = useState([]);
  const [filesToUp, setFilesToUp] = useState([]);

  function checkNumLoadFiles(arrFiles = []) {
    console.log(arrFiles);
    setFilesToUp(arrFiles);
    if (arrFiles.length <= 20) {
      let res = [];
      let errorFiles = [];
      const except = /(\.pdf|\.png|\.jpeg|\.PNG|\.PDF|\.JPEG)$/;
      for (let i = 0; i < arrFiles.length; i++) {
        console.log(arrFiles[i].name);

        if (except.test(arrFiles[i].name)) {
          res.push(arrFiles[i]);
        } else {
          errorFiles.push(arrFiles[i]);
        }
      }

      console.log(res);
      console.log(errorFiles);

      if (errorFiles.length != 0) {
        setErrorFiles(errorFiles);
        setMessage('ניתן להעלות רק קבצים מסוג: PDF, PNG, JPEG.');
      }
    } else {
      toast.error('לא ניתן לטעון מעל 20 קבצים!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  function sendFilesToDB() {
    fetch('uploadingDocument', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filesToUp),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // if (res.isUpDate) {
        //   toast.success(res.message, {
        //     position: toast.POSITION.BOTTOM_CENTER,
        //   });
        //   localStorage.setItem('SelectedCus', userName);
        //   localStorage.setItem('CusVAT_Id', idVAT);
        // } else {
        //   toast.error(res.message, {
        //     position: toast.POSITION.BOTTOM_CENTER,
        //   });
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className='body'>
      <Sidebar />
      <ToastContainer />
      <main>
        <form>
          <div>
            <input
              id='file'
              type='file'
              name='uploaded-file'
              multiple
              onChange={e => {
                setFiles(e.target.files);
              }}
              accept='.pdf,.png,.jpeg'
            />
          </div>
        </form>
        <Button
          text='שלח'
          isDisable={files.length === 0}
          fun={() => {
            checkNumLoadFiles(files);
          }}
        ></Button>
        {message !== '' && (
          <div>
            <p>{message}</p>
            <p>להלן הקבצים שהועלו בהצלחה:</p>
            {filesToUp.map(el => {
              return (
                <p key={uuid()} className={css.ToUp}>
                  {el.name}
                </p>
              );
            })}
            <p>להלן הקבצים שלא הועלו:</p>
            {errorFiles.map(el => {
              return (
                <p key={uuid()} className={css.errFile}>
                  {el.name}
                </p>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
