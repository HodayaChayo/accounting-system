import React, { useState } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './cusIndex.module.css';
import BarChart from './BarChart'


export default function CusIndex() {
  return (
    <div className='body'>
      <Sidebars />
      <Header title='דף הבית' />
      {/* <BarChart/> */}
      <main className={css.article}>
        <h1>תמונת מצב:</h1>
        <div className={css.firstDiv}>
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
        </div>
      </main>
      <BarChart />
      <Footer />
    </div>
  );
}
