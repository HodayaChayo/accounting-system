import React, { useState } from 'react';
import Button from '../../Button/Button';
import css from './uploadingDocuments.module.css';
import Sidebar from '../../Sidebars/Sidebars';
import { ToastContainer, toast } from 'react-toastify';

export default function UploadingDocuments() {
  const [files, setFiles] = useState([]);

  checkNumLoadFiles(files)

  function checkNumLoadFiles(arrFiles = []) {
    console.log(arrFiles);
    let res = []
    const except =/(\.pdf|\.png|\.jpeg)$/ 
    for(let i=0; i< arrFiles.length; i++){
      console.log(arrFiles[i].name);
      if(except.test(arrFiles[i].name)){
        res.push(arrFiles[i])
      }
    }
    console.log(res);
  }

  return (
    <div className={css.btn}>
      <Sidebar />
      <ToastContainer/>
      <form>
        <div>
          <input
            id='file'
            type='file'
            name='uploaded-file'
            multiple
            onChange={(e)=>{setFiles(e.target.files)}}
            accept='.pdf,.png,.jpeg'
          />
        </div>
      </form>
      <Button text='שלח' fun={() => {}}></Button>
    </div>
  );
}
