import React, { useState, useEffect } from 'react';
import css from './incomeTaxReport.module.css';
import Select from 'react-select';
import Button from '../../Button/Button';
import { monthly, biMonthly } from '../../monthSelect/monthSelect';
import { FaLockOpen, FaLock } from 'react-icons/fa';
import Header from '../../Header/Header';
import Sidebars from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';

export default function IncomeTaxReport() {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [incomeFrequency, setIncomeFrequency] = useState();
  const [selectYear, setSelectYear] = useState([]);
  const [year, setYear] = useState({ value: currentYear, label: currentYear });
  const [month, setMonth] = useState();
  const [lock, setLock] = useState('?');
  const [data, setData] = useState([]);

  useEffect(() => {
    let list = [];
    let i = 2020;
    while (i <= currentYear) {
      list.push({ value: i, label: i });
      i++;
    }
    setSelectYear(list);

    fetch('/userSettings/getIncomeFrequency', {
      method: 'POST',
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setIncomeFrequency(res.tax_income_frequency);
        if (currentMonth % res.tax_income_frequency === 0) {
          setMonth(
            res.tax_income_frequency === 1
              ? monthly[currentMonth - 1]
              : biMonthly[
                  currentMonth === 1
                    ? 0
                    : Math.abs(Math.floor(currentMonth / 2) - 1)
                ]
          );
        } else {
          setMonth(
            res.tax_income_frequency === 1
              ? monthly[currentMonth - 1]
              : biMonthly[
                  currentMonth === 1
                    ? 0
                    : Math.abs(Math.floor(currentMonth / 2) - 1)
                ]
          );
        }
      });
    // console.log(month);
    // isLocked()
  }, []);

  const getIncome = () => {
    fetch('incomeReport/getIncomeReport', {
      method: 'POST',
      body: JSON.stringify({ thisVatId, month, year }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setData(res);
        setLock(res.isLock)
        // commands.forEach(commands,el => {
        //   setSumIncome(el.credit_amount);
        // });
        // console.log(sumIncome);
      });
  };

  return (
    <div className='body'>
      <Header title={'דו"ח מס הכנסה'} />
      <Sidebars />
      <main>
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
            options={incomeFrequency === '1' ? monthly : biMonthly}
            placeholder='בחר'
            value={month}
            onChange={data => setMonth(data)}
          />
          <Button
            className={css.selectItem}
            text='הצג'
            fun={() => {
              getIncome();
            }}
          />
        </div>
        <div className={css.mainAll}>
          <div className={css.allDiv}>
            <p>{lock === '?' ? '--' : data.result.mySum}</p>
            <p>המחזור העסקי</p>
          </div>
          <p className={`${css.allPAout} ${css.allDiv}`}>X</p>

          <div className={css.allDiv}>
            <p>0</p>
            <p>אחוז המקדמה</p>
          </div>
          <p className={`${css.allPAout} ${css.allDiv}`}>=</p>

          <div className={css.allDiv}>
            <p>0</p>
            <p>מקדמות על פי אחוז המקדמה</p>
          </div>
          <div className={css.allDiv}>
            <p>0</p>
            <p>ניכויים במקור לקיזוז</p>
          </div>
          <div className={css.allDiv}>
            <p>0</p>
            <p>סה"כ לתשלום</p>
          </div>
          <Button
            text={lock === true ? 'שחרר דוח' : 'נעל דוח'}
            isDisable={lock === '?'}
            fun={() => {}}
          />
          {lock === true ? <FaLock /> : <FaLockOpen />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
