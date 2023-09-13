import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import css from './vatReport.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Select from 'react-select';
import Button from '../../Button/Button';
import { monthly, biMonthly } from '../../monthSelect/monthSelect';
import { FaLockOpen, FaLock } from 'react-icons/fa';

export default function VatReport() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  // const currentMonth = 7
  const [vatFrequency, setVatFrequency] = useState();
  const [selectYear, setSelectYear] = useState([]);
  const [year, setYear] = useState({ value: currentYear, label: currentYear });
  const [month, setMonth] = useState();
  const [lock, setLock] = useState();

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
        // console.log(res);
        setVatFrequency(res.vat_frequency);
        // if (currentMonth % res.vat_frequency === 0) {
        //   setMonth(
        //     res.vat_frequency === 1
        //       ? monthly[currentMonth - 1]
        //       : biMonthly[
        //           currentMonth === 1
        //             ? 0
        //             : Math.abs(Math.floor(currentMonth / 2) - 1)
        //         ]
        //   );
        // } else {
        //   setMonth(
        //     res.vat_frequency === 1
        //       ? monthly[currentMonth - 1]
        //       : biMonthly[
        //           currentMonth === 1
        //             ? 0
        //             : Math.abs(Math.floor(currentMonth / 2) - 1)
        //         ]
        //   );
        // }
      });
    // console.log(month);
    // isLocked()
  }, []);

  const getReportData = () => {
    fetch('/vatReport/isLocked', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, year, month }),
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        setLock(res);
      });
  };

  return (
    <div className='body'>
      <Sidebars />
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
              console.log(vatFrequency);
              console.log(month);
              console.log(year);
              getReportData();
            }}
          />
        </div>
        <div className={css.displayContainer}>
          <div>
            <p>הכנסות פטורות:</p>
            <p>סכום</p>
          </div>
          <div>
            <p>הכנסות חייבות:</p>
            <p>סכום</p>
          </div>
          <div>
            <p>מע"מ:</p>
            <p>סכום</p>
          </div>
          <div>
            <p>מע"מ תשומות נכסים:</p>
            <p>סכום</p>
          </div>
          <div>
            <p>מע"מ תשומות אחרות:</p>
            <p>סכום</p>
          </div>
          <div>
            <p>מע"מ לתשלום:</p>
            <p>סכום</p>
          </div>
          <Button text={lock ? 'שחרר דוח' : 'נעל דוח'} fun={() => {}} />
          {lock ? <FaLock /> : <FaLockOpen />}
        </div>
        <h3>פירוט מע"מ</h3>
      </main>
      <Footer />
    </div>
  );
}
