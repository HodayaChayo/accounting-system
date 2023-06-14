// import React from 'react';
import React, { Fragment } from 'react';
import Sidebars from '../Sidebars/Sidebars';
export default function Header(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <Fragment>
        <Sidebars />
      </Fragment>
    </div>
  );
}
