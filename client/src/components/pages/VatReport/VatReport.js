import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import css from './vatReport.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Select from 'react-select';
import Button from '../../Button/Button';
import Table from '../../Table/Table';
import { vatReportColumns } from './vatReportColumns';
import { monthly, biMonthly } from '../../monthSelect/monthSelect';
import { FaLockOpen, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function VatReport() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const userType = localStorage.getItem('UserType');
  const currentYear = new Date().getFullYear();
  const [vatFrequency, setVatFrequency] = useState();
  const [selectYear, setSelectYear] = useState([]);
  const [year, setYear] = useState({ value: currentYear, label: currentYear });
  const [month, setMonth] = useState();
  const [data, setData] = useState();
  const [lock, setLock] = useState('?');
  const [monthTitle, setMonthTitle] = useState({ value: '--', label: '--' });

  useEffect(() => {
    let list = [];
    let i = 2020;
    while (i <= currentYear) {
      list.push({ value: i, label: i });
      i++;
    }
    setSelectYear(list);

    fetch('/userSettings/getVatFrequency', {
      method: 'POST',
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        setVatFrequency(res.vat_frequency);
      });
  }, []);

  const getReportData = () => {
    fetch('/vatReport/getData', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, year, month }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setData(res);
        setLock(res.lock);
      });
  };

  // locking the selected month report
  const lockReport = () => {
    fetch('/vatReport/lockReport', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, year, month }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isUpDate) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          getReportData();
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  // locking the selected month report
  const unlockReport = () => {
    fetch('/vatReport/unlockReport', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, year, month }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isUpDate) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          getReportData();
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  return (
    <div className='body'>
      <Sidebars />
      <ToastContainer />
      <Header title='דוח מע"מ' />
      <main className={css.mainAll}>
        <div className={css.selectors}>
          <Select
            className={css.selectItem}
            options={selectYear}
            placeholder='בחר'
            value={year}
            onChange={data => setYear(data)}
          />
          <Select
            className={css.selectItem}
            options={vatFrequency === '1' ? monthly : biMonthly}
            placeholder='בחר'
            value={month}
            onChange={data => setMonth(data)}
          />
          <Button
            className={css.selectItem}
            text='הצג'
            fun={() => {
              if (month !== undefined) {
                getReportData();
                setMonthTitle(month);
              }
            }}
          />
        </div>
        <h3>מע"מ לדיווח: {monthTitle.label}</h3>
        <div className={css.displayContainer}>
          <div>
            <p>הכנסות פטורות:</p>
            <p>{lock === '?' ? '--' : data.noVat.mySum}</p>
          </div>
          <div>
            <p>הכנסות חייבות:</p>
            <p>{lock === '?' ? '--' : data.withVat.mySum}</p>
          </div>
          <div>
            <p>מע"מ:</p>
            <p>{lock === '?' ? '--' : data.vat.mySum}</p>
          </div>
          <div>
            <p>מע"מ תשומות נכסים:</p>
            <p>{lock === '?' ? '--' : data.vatOnAssets.mySum}</p>
          </div>
          <div>
            <p>מע"מ תשומות אחרות:</p>
            <p>{lock === '?' ? '--' : data.vatOnOthers.mySum}</p>
          </div>
          <div>
            <p>מע"מ לתשלום:</p>
            <p>
              {lock === '?'
                ? '--'
                : data.vat.mySum -
                  data.vatOnAssets.mySum -
                  data.vatOnOthers.mySum}
            </p>
          </div>

          {userType !== 'לקוח' && (
            <Button
              text={lock === true ? 'שחרר דוח' : 'נעל דוח'}
              isDisable={lock === '?'}
              fun={() => {
                if (lock === true) {
                  unlockReport();
                } else {
                  lockReport();
                }
              }}
            />
          )}

          {lock === true ? <FaLock /> : <FaLockOpen />}
        </div>
        <h2>פירוט מע"מ</h2>
        <h3>הכנסות פטורות</h3>
        {lock !== '?' && (
          <Table myData={data.noVat.rows} myColumns={vatReportColumns} />
        )}
        <h3>הכנסות חייבות</h3>
        {lock !== '?' && (
          <Table myData={data.withVat.rows} myColumns={vatReportColumns} />
        )}
        <h3>תשומות אחרות</h3>
        {lock !== '?' && (
          <Table myData={data.vatOnOthers.rows} myColumns={vatReportColumns} />
        )}

        <h3>תשומות על נכסים</h3>
        {lock !== '?' && (
          <Table myData={data.vatOnAssets.rows} myColumns={vatReportColumns} />
        )}
      </main>
      <Footer />
    </div>
  );
}
