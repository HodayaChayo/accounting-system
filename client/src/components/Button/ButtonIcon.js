import React, { useState } from 'react';
import css from './button.module.css';
export default function ButtonIcon(props) {
  const clickFunction = () => {
    console.log('in click');
    props.fun()
  };

  return (
    <div className={css.icon} onClick={clickFunction}>
      {props.src}
    </div>
  );
}
