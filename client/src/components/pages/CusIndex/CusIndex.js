import React, { useState } from 'react';
import Sidebars from '../../Sidebars/Sidebars'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

export default function CusIndex() {
  return (
    <div className='body'>
      <Sidebars/>
      <Header title='דף הבית'/>
      <main></main>
      <Footer/>
    </div>
  );
}
