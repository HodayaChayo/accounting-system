import React from 'react';
import css from './AlertDialog.module.css';
import cssPopup from './popupGeneral.module.css';
import Button from '../Button/Button';

export default function AlertDialog(props) {
  return (
    <div className={cssPopup.screen}>
      <div className={cssPopup.popup}>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <div className={css.buttons}>
          <Button
            text={props.btnText}
            fun={() => {
              props.fun();
            }}
          />
          <Button
            text='ביטול'
            fun={() => {
              props.setDisplay(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
