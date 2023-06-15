// import React from 'react';
import React, { Fragment } from 'react';
import Sidebars from '../Sidebars/Sidebars';
import css from './header.module.css'
export default function Header(props) {
  return (
    <div className={css.headerTitle}>
      <div>{localStorage.getItem('CusName')}-{localStorage.getItem('CusVAT_Id')}</div>
      <h2>{props.title}</h2>
      <Fragment>
        <Sidebars />
      </Fragment>
    </div>
  );
}
