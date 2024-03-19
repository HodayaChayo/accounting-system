import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './cusIndex.module.css';
import BarChart from './BarChart';
import { getData } from './dataBarChart';

export default function CusIndex() {
  const currentYear = new Date().getFullYear();
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [barChartData, setBarChartData] = useState(getData)
  const [tmpData, setTmpData] = useState([1,2])

  // get batChart data
  useEffect(() => {
    fetch('/commands/barChartData', {
      method: 'POST',
      body: JSON.stringify({ currentYear, thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // setBarChartData(res);
        setTmpData(res)
        // getData(res)
        // console.log(barChartData);

        
      });
  }, []);

  // useEffect(()=>{
  //   // Function to translate month name from Hebrew to English
  //   function translateMonth(hebrewMonth) {
  //     const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  //     return months.indexOf(hebrewMonth) + 1;
  // }

  // // Update values in the firstArray
  // const updatedArray = [...barChartData];
  // tmpData.forEach(({ month, expenses, income }) => {
  //     const index = translateMonth(month) - 1;
  //     if (index >= 0 && index < updatedArray.length) {
  //         updatedArray[index].expenses = expenses;
  //         updatedArray[index].income = income;
  //     }
  // });

  // setBarChartData(updatedArray);
  // },[tmpData])

  // useEffect(()=>{},[barChartData])


  return (
    <div className='body'>
      <Sidebars />
      <Header title='דף הבית' />
      <main className={css.article}>
        <h1>תמונת מצב:</h1>
        {/* <div className={css.firstDiv}>
          <div className={css.insidDiv}>
            <p>סה"כ הכנסות 2023</p>
            <p>102,345</p>
          </div>
          <div className={css.insidDiv}>
            <p>סה"כ הוצאות 2023</p>
            <p>54,891</p>
          </div>
          <div className={css.insidDiv}>
            <p>סה"כ מע"מ ששולם</p>
            <p>10,345</p>
          </div>
          <div className={css.insidDiv}>
            <p>סה"כ מקדמות מ.ה ששולם</p>
            <p>5,786</p>
          </div>
        </div> */}
      </main>
      <BarChart data={tmpData}/>
      <Footer />
    </div>
  );
}
