import React, { useState, useEffect } from 'react';
import css from './incomeTaxReport.module.css';

import Header from '../../Header/Header';
import Sidebars from '../../Sidebars/Sidebars';
import Footer from '../../Footer/Footer';

export default function IncomeTaxReport() {
  return (
    <div className='body'>
      <Header title={'דו"ח מס הכנסה'} />
      <Sidebars />
      <main>
        <div className={css.allDiv}>
          <p>0</p>
          <p>מקדמות על פי אחוז המקדמה</p>
        </div>
        <p className={css.allPAout}>=</p>
        <div className={css.allDiv}>
          <p>0</p>
          <p>אחוז המקדמה</p>
        </div>
        <p className={css.allPAout}>X</p>
        <div className={css.allDiv}>
          <p>0</p>
          <p>המחזור העסקי</p>
        </div>
        <div className={css.allDiv}>
          <p>0</p>
          <p>ניכויים במקור לקיזוז</p>
        </div>
        <div className={css.allDiv}>
          <p>0</p>
          <p>סה"כ לתשלום</p>
        </div>
        <div className={css.allDiv}>
          <p>0</p>
          <p>ניכויים מצטברים</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
