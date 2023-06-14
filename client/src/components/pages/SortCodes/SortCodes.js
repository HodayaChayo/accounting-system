import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Button from '../../Button/Button';
import { checkCusName, numbersOnly } from '../../validations/validations';

export default function SortCodes() {
  const [codeNum, setCodeNum] = useState('');
  const [codeName, setCodeName] = useState('');
  const [addDisable, setAddDisable] = useState(true);

  const addSortCode = () =>{
    fetch('addSortCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({codeNum, codeName}),
    })
      .then(res => res.json())
      .then(res => {})
  }

  return (
    <div className='body'>
      <Header title='הגדרת קודי מיון' />
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
            <Button text='הוספה' isDisable={!checkCusName(codeName) || !numbersOnly(codeNum)} fun={addSortCode} />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
