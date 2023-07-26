import React, { useState, useEffect } from 'react';
import css from './uploadingDocuments.module.css';
import Footer from '../../Footer/Footer';
import Sidebar from '../../Sidebars/Sidebars';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

export default function UploadingDocuments(props) {
  const [message, setMessage] = useState('');
  const [errorFilesToPrint, setErrorFilesToPrint] = useState([]);
  const [filesToPrint, setFilesToPrint] = useState([]);

  const formData = new FormData();
  const userName = localStorage.getItem('SelectedCus');

  // send only the user name for save in server.
  useEffect(() => {
    fetch('/uploadingDocument/saveUserName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName }),
    })
      .then(res => res.json())
      .then(res => {});
  }, []);

  // sort good file and ron files.
  async function checkNumLoadFiles(arrFiles) {
    setMessage('');
    filesToPrint.splice(0, filesToPrint.length);
    setFilesToPrint([...filesToPrint]);

    errorFilesToPrint.splice(0, errorFilesToPrint.length);
    setErrorFilesToPrint([...errorFilesToPrint]);

    console.log(arrFiles);
    if (arrFiles.length <= 20) {
      let errorFiles = [];
      const except = /(\.pdf|\.png|\.jpeg|\.PNG|\.PDF|\.JPEG)$/;
      for (let i = 0; i < arrFiles.length; i++) {
        console.log(arrFiles[i].name);

        if (except.test(arrFiles[i].name)) {
          formData.append('uploaded-file', arrFiles[i]);
        } else {
          errorFiles.push(arrFiles[i]);
        }
      }

      // prints for checking.
      console.log(formData);
      console.log(errorFiles);
      formData.forEach(file => {
        filesToPrint.push(file);
        setFilesToPrint([...filesToPrint]);
        console.log(file);
      });

      if (errorFiles.length === 0) {
        setMessage('להלהן:');
        toast.success('!הפקודה נוצרה בהצלחה');
      }

      if (errorFiles.length !== 0) {
        setErrorFilesToPrint(errorFiles);
        setMessage('ניתן להעלות רק קבצים מסוג: PDF, PNG, JPEG.');
      }
    }

    // -----------------------
    // sent the files to the server.
    let answer = await fetch('/uploadingDocument/upload-files', {
      method: 'POST',
      body: formData,
    });
    console.log(answer);
    answer = await answer.json();
  }

  return (
    <div className='body'>
      <Sidebar />
      <ToastContainer />
      <main>
        <form encType='multipart/form-data'>
          <div>
            <input
              id='uploaded-file'
              type='file'
              name='uploaded-file'
              multiple
              onChange={e => {
                checkNumLoadFiles(e.target.files);
              }}
              accept='.pdf,.png,.jpeg'
            />
          </div>
        </form>
        {message !== '' && (
          <div>
            <p>{message}</p>
            <p> הקבצים שהועלו בהצלחה:</p>
            {filesToPrint.map(el => {
              return (
                <p key={uuid()} className={css.ToUp}>
                  {el.name}
                </p>
              );
            })}
          </div>
        )}
        {message !== '' && errorFilesToPrint.length !== 0 && (
          <div>
            <p>להלן הקבצים שלא הועלו:</p>
            {errorFilesToPrint.map(el => {
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
