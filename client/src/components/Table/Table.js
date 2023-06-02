import React, { Component } from 'react';
import css from './table.module.css';
import { v4 as uuid } from 'uuid';


export default class Table extends Component {

  render() {
    const tableFields = this.props.fieldsArr.map(field => (
      <div className={css.tableFields} key={uuid()}>{field}</div>
    ));
    return <div className={css.tableDiv} >{tableFields}</div>;
  }
}
