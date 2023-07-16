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

  const formData = new FormData();

  async function checkNumLoadFiles(arrFiles) {
    console.log('hiii');
    console.log(arrFiles);
    if (arrFiles.length <= 20) {
      let goodFiles = [];
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
      setFilesToUp(formData);
      console.log(goodFiles);
      console.log(errorFiles);

      formData.forEach(file => {
        console.log(file);
      });

      if (errorFiles.length !== 0) {
        setErrorFiles(errorFiles);
        setMessage('ניתן להעלות רק קבצים מסוג: PDF, PNG, JPEG.');
      }
    } else {
      toast.error('לא ניתן לטעון מעל 20 קבצים!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    // -----------------------

    let answer = await fetch('/uploadingDocument/upload-files', {
      method: 'POST',
      body: formData,
    });
    console.log(answer);
    answer = await answer.json();

    // .then(res => res.json())
    // .then(res => {
    //   console.log(res);

    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  const sendFiles = () => {
    // formData.append('file', filesToUp);
    console.log(
      filesToUp.forEach(file => {
        console.log(file);
      })
    );
    console.log(filesToUp);
    fetch('/uploadingDocument/upload-files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          <Button
            text='שלח'
            // isDisable={filesToUp.length === 0}
            fun={() => {
              sendFiles();
            }}
          ></Button>
        </form>
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
