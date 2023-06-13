import React, { useState } from 'react';

export default function CusIndex(){
  return <p>{localStorage.getItem('SelectedCus')}</p>
}