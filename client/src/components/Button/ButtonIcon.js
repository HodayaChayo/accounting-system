import React, { useState } from 'react';
import css from './button.module.css';
export default function ButtonIcon(props) {
  const clickFunction = () => {
    console.log('in click');
  };

  return <img className={css.icon} onClick={clickFunction} src={props.src}></img>;
}
