import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { checkCusName, numbersOnly } from '../../validations/validations';

export default function SortCodes() {
  const [codeNum, setCodeNum] = useState('');
  const [codeName, setCodeName] = useState('');
  const [addDisable, setAddDisable] = useState(true);

  const thisVatId = localStorage.getItem('CusVAT_Id');
  const addSortCode = () => {
    const codeNumber = Number(codeNum);
    fetch('/addSortCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId, codeNumber, codeName }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <div className='body'>
      <Header title='הגדרת קודי מיון' />
      <ToastContainer />
      <main>
        <div>
          <h3>הוספת קוד מיון:</h3>
          <form action=''>
            מספר:{' '}
            <input
              type='number'
              placeholder='מספר קוד מיון'
              onChange={e => {
                setCodeNum(e.target.value);
              }}
            />
            שם:{' '}
            <input
              type='text'
              maxLength={20}
              placeholder='שם קוד מיון'
              onChange={e => {
                setCodeName(e.target.value);
              }}
            />
            <Button
              text='הוספה'
              isDisable={!checkCusName(codeName) || !numbersOnly(codeNum)}
              fun={addSortCode}
            />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
