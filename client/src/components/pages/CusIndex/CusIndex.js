import React, { useState } from 'react';
import Sidebars from '../../Sidebars/Sidebars'
import Header from '../../Header/Header';

export default function CusIndex() {
  return (
    <div className='body'>
      <Sidebars/>
      <Header title='דף הבית'/>
    </div>
  );
}
