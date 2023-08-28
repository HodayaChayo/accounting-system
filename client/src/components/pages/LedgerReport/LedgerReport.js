import React, { useState, useEffect } from 'react';
import css from './ledgerReport.module.css';
import { v4 as uuid } from 'uuid';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Select from 'react-select';
import Button from '../../Button/Button';
import Table from '../../Table/Table';
import { ledgerReportColumns } from './ledgerReportColumns';

export default function LedgerReport() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [selectAccount, setSelectAccount] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState(`${currentYear}-12-31`);
  const [allData, setAllData] = useState([]);

  // get all the accounts for select and data
  useEffect(() => {
    fetch('/accounts/getSelectData', {
      method: 'POST',
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        setSelectAccount(res);
      })
      .then(
        fetch('/ledgerReport/getAll', {
          method: 'POST',
          body: JSON.stringify({ thisVatId, fromDate, toDate }),
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setAllData(res);
          })
      );
  }, []);

  // Function triggered on selection
  function handleAccountsSelect(data) {
    setSelectedAccount(data);
  }

  // request only selected accounts
  const requestData = () => {
    fetch('/ledgerReport/getSelected', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, fromDate, toDate, selectedAccount }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setAllData(res);
      });
  };

  return (
    <div className='body'>
      <Sidebars />
      <Header title='דוח כרטסת' />
      <main>
        <div className={css.selectors}>
          <div className={css.search}>
            <p>חשבון:</p>
            <Select
              options={selectAccount}
              placeholder='הכל'
              value={selectedAccount}
              onChange={handleAccountsSelect}
              isMulti
            />
          </div>
          <div className={css.dates}>
            <p>
              מתאריך:
              <input
                type='date'
                value={fromDate}
                onChange={e => {
                  setFromDate(e.target.value);
                }}
              />
            </p>
            <p>
              עד תאריך:
              <input
                type='date'
                value={toDate}
                onChange={e => {
                  setToDate(e.target.value);
                }}
              />
            </p>
          </div>
          <Button
            text='הצג'
            fun={() => {
              requestData();
            }}
          />
        </div>
        <div className={css.tables}>
          {allData.map(el => {
            return (
              <Table
                key={uuid()}
                myData={el.data}
                myColumns={[{ Header: el.name, columns: ledgerReportColumns }]}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
