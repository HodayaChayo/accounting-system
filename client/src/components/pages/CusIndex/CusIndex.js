import React, { useState } from 'react';

export default function CusIndex() {
  return (
    <div className='body'>
      <a href='/sortCodes'>קודי מיון</a>
      <p>{localStorage.getItem('SelectedCus')}</p>
    </div>
  );
}
