import React, { useState } from 'react';
import Button from '../../Button/Button';
import css from './uploadingDocuments.module.css';
import Sidebar from '../../Sidebars/Sidebars';
import { ToastContainer, toast } from 'react-toastify';

export default function UploadingDocuments() {
  const [files, setFiles] = useState([]);

  function filesToUp(event) {
    console.log(event);
    setFiles(event.target.files);
    console.log(event.target.files); 
  }

  checkNumLoadFiles(files)

  function checkNumLoadFiles(arrFiles = []) {
    console.log(arrFiles);
    if (arrFiles.length <= 20){

    }
    else {
      toast.success('לא ניתן לטעון יותר מ - 20 קבצים!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return files
    }
  }

  return (
    <div className={css.btn}>
      <Sidebar />
      <form>
        <div>
          <input
            id='file'
            type='file'
            name='uploaded-file'
            multiple
            onChange={filesToUp}
            accept='.pdf,.png,.jpeg'
          />
        </div>
      </form>
      <Button text='שלח' fun={() => {}}></Button>
    </div>
  );
}
