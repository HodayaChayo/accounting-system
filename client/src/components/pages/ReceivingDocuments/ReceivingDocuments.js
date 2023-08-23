import React, { useState, useEffect } from 'react';
import DisplayDocuments from '../../DisplayDocuments/DisplayDocuments';
import PdfViewerComponent from '../../DisplayDocuments/PdfViewerComponent';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import css from './receivingDocuments.module.css';
import Button from '../../Button/Button';
import myFile from './hesh.pdf';
import Sidebar from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import {
  numbersOnly,
  dateNotGreater,
  isAmountDecimalOrNumeric,
} from '../../validations/validations';

export default function ReceivingDocuments(props) {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const connectedUser = localStorage.getItem('ConnectedUser');
  const [selectCommandType, setSelectCommandType] = useState([]);
  const [selectAccount, setSelectAccount] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [commandData, setCommandData] = useState({
    commandType: 'null',
    reference: '',
    date: '0000-00-00',
    debitAccount: 'null',
    creditAccount: 'null',
    otherAccount: 'null',
    debitAmount: 0,
    creditAmount: 0,
    otherAmount: 0,
    note: '',
    thisVatId: thisVatId,
    connectedUser: connectedUser,
  });

  // get command type data for select
  useEffect(() => {
    fetch('/commandType/getSelectCommandType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log('get data');
        // console.log(res);
        setSelectCommandType(res);
      });
  }, []);

  // get all the accounts for select
  useEffect(() => {
    fetch('/accounts/getSelectData', {
      method: 'POST',
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        setSelectAccount(res);
      });
  }, []);

  // get chosen commandType data from server and calculate amounts
  useEffect(() => {
    const commandType = commandData.commandType;
    if (commandType !== 'null') {
      fetch('/commandType/getCalculation', {
        method: 'POST',
        body: JSON.stringify({ thisVatId, commandType }),
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          let totalPercent = 0;
          res.forEach(el => {
            if (Object.keys(el)[0] === 'debit_account') {
              totalPercent += el.percent;
            }
          });

          let updates = {};
          res.forEach(el => {
            if (Object.keys(el)[0] === 'debit_account') {
              if (el.debit_account === -1) {
                let result = (el.percent / totalPercent) * totalAmount;
                updates.debitAmount = result.toFixed(2);
              } else {
                updates.otherAccount = el.debit_account;
                let result = (el.percent / totalPercent) * totalAmount;
                updates.otherAmount = result.toFixed(2);
              }
            } else {
              if (el.credit_account === -1) {
                let result = (el.percent / totalPercent) * totalAmount;
                updates.creditAmount = result.toFixed(2);
              } else {
                updates.otherAccount = el.credit_account;
                let result = (el.percent / totalPercent) * totalAmount;
                updates.otherAmount = result.toFixed(2);
              }
            }
          });
          setCommandData(prevData => ({ ...prevData, ...updates }));
        });
    } else {
      let updates = {
        otherAccount: 'null',
        otherAmount: 0,
        debitAmount: totalAmount,
        creditAmount: totalAmount,
      };

      setCommandData(prevData => ({ ...prevData, ...updates }));
    }
  }, [
    totalAmount,
    commandData.commandType,
    commandData.debitAccount,
    commandData.creditAccount,
  ]);

  const sendCommand = () => {
    fetch('/commands/addCommand', {
      method: 'POST',
      body: JSON.stringify(commandData),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          setCommandData({
            commandType: 'null',
            reference: '',
            date: '0000-00-00',
            debitAccount: 'null',
            creditAccount: 'null',
            otherAccount: 'null',
            debitAmount: 0,
            creditAmount: 0,
            otherAmount: 0,
            note: '',
            thisVatId: thisVatId,
            connectedUser: connectedUser,
          });
          setTotalAmount(0);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
  };

  return (
    <div className='body'>
      <Sidebar />
      <ToastContainer />
      <Header title='קליטת מסמכים' />
      <main className={css.allMain}>
        <div className={css.allInput}>
          <p>סוג פקודה:</p>
          <select
            name='commandType'
            value={commandData.commandType}
            onChange={e => {
              setCommandData({ ...commandData, commandType: e.target.value });
            }}
          >
            <option value='null' label='ללא בחירה'></option>
            {selectCommandType.map(el => {
              return (
                <option key={uuid()} label={el.label} value={el.value}></option>
              );
            })}
          </select>
          <p>אסמכתה:</p>
          <input
            type='text'
            name='InvoiceNumber'
            placeholder='מספר חשבונית'
            value={commandData.reference}
            maxLength={20}
            onChange={e => {
              setCommandData({ ...commandData, reference: e.target.value });
            }}
          ></input>
          <p>תאריך:</p>
          <input
            type='date'
            name='date'
            placeholder='תאריך'
            value={commandData.date}
            maxLength={20}
            onChange={e => {
              setCommandData({ ...commandData, date: e.target.value });
            }}
          ></input>
          <p>חשבון חובה:</p>
          <select
            name='debitAccount'
            value={commandData.debitAccount}
            onChange={e => {
              setCommandData({ ...commandData, debitAccount: e.target.value });
            }}
          >
            <option value='null' label='בחר'></option>

            {selectAccount.map(el => {
              return (
                <option key={uuid()} label={el.label} value={el.value}></option>
              );
            })}
          </select>
          <p>חשבון זכות:</p>
          <select
            name='creditAccount'
            value={commandData.creditAccount}
            onChange={e => {
              setCommandData({ ...commandData, creditAccount: e.target.value });
            }}
          >
            <option value='null' label='בחר'></option>

            {selectAccount.map(el => {
              return (
                <option key={uuid()} label={el.label} value={el.value}></option>
              );
            })}
          </select>
          <p>סכום כולל מע"מ</p>
          <input
            type='text'
            name='InvoiceAmount'
            placeholder='סכום כולל מע"מ'
            value={Number(totalAmount)}
            maxLength={20}
            onChange={e => {
              setTotalAmount(Number(e.target.value).toFixed(2));
            }}
          ></input>
          <p>לפני מע"מ: {totalAmount - commandData.otherAmount}</p>
          <p>מע"מ: {commandData.otherAmount}</p>
          <p>מע"מ מאולץ:</p>
          <input
            type='text'
            name='otherVAT'
            placeholder='מע"מ מאולץ'
            value={commandData.otherAmount}
            maxLength={20}
            onChange={e => {
              setCommandData({ ...commandData, otherAmount: e.target.value });
            }}
          ></input>
          <p>הערות:</p>
          <textarea
            name='note'
            cols='25'
            rows='5'
            onChange={e => {
              setCommandData({ ...commandData, note: e.target.value });
              console.log(commandData);
            }}
          ></textarea>
          <Button
            text='קלוט'
            fun={() => {
              console.log(commandData);
              sendCommand();
            }}
            isDisable={
              !numbersOnly(commandData.reference) ||
              !dateNotGreater(commandData.date) ||
              commandData.debitAccount === 'null' ||
              commandData.creditAccount === 'null' ||
              Number(commandData.otherAmount) > Number(totalAmount) ||
              !isAmountDecimalOrNumeric(Number(totalAmount)) ||
              !(
                isAmountDecimalOrNumeric(Number(commandData.otherAmount)) ||
                Number(commandData.otherAmount) === 0
              )
            }
          />
        </div>
        <div className={css.pdf}>
          <PdfViewerComponent document={myFile} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
