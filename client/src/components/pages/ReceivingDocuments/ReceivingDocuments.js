import React, { useState, useEffect } from 'react';
import PdfViewerComponent from '../../DisplayDocuments/PdfViewerComponent';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import css from './receivingDocuments.module.css';
import Button from '../../Button/Button';
import ButtonIcon from '../../Button/ButtonIcon';
import myFile from './WaitingAnimation.gif';
import Sidebar from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import Select from 'react-select';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import {
  numbersOnly,
  dateNotGreater,
  isAmountDecimalOrNumeric,
} from '../../validations/validations';

export default function ReceivingDocuments(props) {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const connectedUser = localStorage.getItem('ConnectedUser');
  const selectedCus = localStorage.getItem('SelectedCus');
  const [docList, setDocList] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState('?');
  const [doc, setDoc] = useState(myFile);
  const [docNumber, setDocNumber] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [change, setChange] = useState(true);
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

  const [selectedDebitOptions, setSelectedDebitOptions] = useState();
  const [selectedCreditOptions, setSelectedCreditOptions] = useState();

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
    getOpenDocList();
    setFirstLoad(false);
  }, []);

  // get names list of all th opened documents
  const getOpenDocList = () => {
    const docNum = docNumber;
    fetch('/documents/getOpenDocList', {
      method: 'POST',
      body: JSON.stringify({ selectedCus }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setDocList(res);
        if (res.length !== 0 && firstLoad) {
          setSelectedDoc(res[0]);
          setDocNumber(1);
          console.log('1');
        } else {
          if (docNum <= res.length) {
            setSelectedDoc(res[docNum - 1]);
            console.log('2');
          } else {
            setDocNumber(docNum - 1);
            setSelectedDoc(res[docNum - 2]);
            console.log('3');
          }
        }
      });
  };



  useEffect(() => {
    if (docList.length !== 0) {
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
  }, [selectedDoc]);

  // move to the document on the right
  const rightArrowDoc = () => {
    const docNum = docNumber;
    if (docNum - 1 !== 0 && docNum !== 0) {
      setDocNumber(docNum => docNum - 1);
      setSelectedDoc(docList[docNum - 2]);
    }
  };

  // move to the document on the left
  const leftArrowDoc = () => {
    const docNum = docNumber;
    if (docNum + 1 <= docList.length && docNum !== 0) {
      setDocNumber(docNum => docNum + 1);
      setSelectedDoc(docList[docNum]);
    }
  };

  function handleDebitSelect(data) {
    setSelectedDebitOptions(data);
    setCommandData({ ...commandData, debitAccount: data.value });
  }

  function handleCreditSelect(data) {
    setSelectedCreditOptions(data);
    setCommandData({ ...commandData, creditAccount: data.value });
  }

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
      body: JSON.stringify({ commandData, selectedDoc, selectedCus }),
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
          getOpenDocList()
          setSelectedDebitOptions('');
          setSelectedCreditOptions('');
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
          <div className={css.buttons}>
            <ButtonIcon src={<BsArrowRightSquareFill />} fun={rightArrowDoc} />
            מסמך: {docNumber} מתוך: {docList.length}
            <ButtonIcon src={<BsArrowLeftSquareFill />} fun={leftArrowDoc} />
          </div>
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
          <Select
            options={selectAccount}
            placeholder='בחר'
            value={selectedDebitOptions}
            onChange={handleDebitSelect}
            isSearchable={true}
          />
          <p>חשבון זכות:</p>
          <Select
            options={selectAccount}
            placeholder='בחר'
            value={selectedCreditOptions}
            onChange={handleCreditSelect}
            isSearchable={true}
          />
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
          <p>
            לפני מע"מ:{' '}
            {(Number(totalAmount) - Number(commandData.otherAmount)).toFixed(2)}
          </p>
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
            value={commandData.note}
            cols='25'
            rows='5'
            onChange={e => {
              setCommandData({ ...commandData, note: e.target.value });
              console.log(selectedDoc);
              console.log(change);
            }}
          ></textarea>
          <Button
            text='קלוט'
            fun={() => {
              console.log(commandData);
              sendCommand();
              // setChange(prev => !prev);
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
          {docList.length === 0 ? (
            <p>אין מסמכים לקליטה</p>
          ) : (
            <PdfViewerComponent document={doc} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
