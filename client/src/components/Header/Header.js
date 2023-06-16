// import React from 'react';
import React, { Fragment } from 'react';
import css from './header.module.css';
export default function Header(props) {
  return (
    <div className={css.headerTitle}>
      <h2>{props.title}</h2>
      {window.location.href !== 'http://localhost:3000/' &&
        window.location.href !== 'http://localhost:3000/home' && (
          <div className={css.cusName}>
            {localStorage.getItem('CusName')}-
            {localStorage.getItem('CusVAT_Id')}
          </div>
        )}

    </div>
  );
}
