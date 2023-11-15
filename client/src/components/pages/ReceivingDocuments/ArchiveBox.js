import React, { useState } from 'react';
import cssPopup from '../../AlertDialog/popupGeneral.module.css';
import css from '../../AlertDialog/AlertDialog.module.css';
import Button from '../../Button/Button';
import { ToastContainer, toast } from 'react-toastify';

export default function ArchiveBox(props) {
  const selectedCus = localStorage.getItem('SelectedCus');
  const [note, setNote] = useState('');
  const [doc, setDoc] = useState(props.doc);

  const saveInArchive = () => {
    fetch('/documents/saveInArchive', {
      method: 'POST',
      body: JSON.stringify({ selectedCus, doc, note }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          props.setDisplay(false);
          props.fun()
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
  };

  return (
    <div className={cssPopup.screen}>
      <div className={cssPopup.popup}>
        <h2>העברת מסמך לארכיון</h2>
        <p>הערה:</p>
        <textarea
          name='note'
          value={note}
          cols='25'
          rows='5'
          onChange={e => {
            setNote(e.target.value);
          }}
        ></textarea>
        <div className={css.buttons}>
          <Button
            text='שמור'
            fun={() => {
              saveInArchive();
            }}
          />
          <Button
            text='ביטול'
            fun={() => {
              props.setDisplay(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
