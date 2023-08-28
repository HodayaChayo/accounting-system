import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Select from 'react-select';
import Button from '../../Button/Button';

export default function VatReport() {
  const currentYear = new Date().getFullYear();
  const [selectYear, setSelectYear] = useState([]);
  const [year, setYear] = useState({ value: currentYear, label: currentYear });


  useEffect(() => {
    let list = [];
    let i = 2020;
    while (i <= currentYear) {
      list.push({ value: i, label: i });
      i++;
    }
    setSelectYear(list);
  }, []);

  return (
    <div className='body'>
      <Sidebars />
      <Header title='דוח מע"מ' />
      <main>
        <Select
          options={selectYear}
          placeholder='בחר'
          value={year}
          onChange={data => setYear(data)}
        />
        <Button text='הצג' fun={()=> console.log(year)}/>
      </main>
      <Footer />
    </div>
  );
}
