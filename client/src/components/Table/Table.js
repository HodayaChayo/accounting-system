import React, { Component } from 'react';
import css from './table.module.css';
import { v4 as uuidv4 } from 'uuid';


export default class Table extends Component {

  render() {
    const tableFields = this.props.fieldsArr.map(field => (
      <div className={css.tableFields}>{field}</div>
    ));
    return <div className={css.tableDiv} key={uuidv4()}>{tableFields}</div>;
  }
}
