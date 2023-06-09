import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import  ColumnFilter  from './ColumnFilter.js';
import css from './table.module.css';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

export default function CustomersTable({ mockData }) {
  const COLUMNS = [
    {
      Header: 'id',
      accessor: 'id',
      disableFilters: true,
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'DOB',
      accessor: 'date_of_birth',
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/MM/yyyy');
      },
      disableFilters: true,
    },
    {
      Header: 'Age',
      accessor: 'age',
      disableFilters: true,
    },
  ];

  const columns = useMemo(() => COLUMNS, []); // memoize before adding to useTable hook
  const data = useMemo(() => [...mockData], [mockData]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  // useTable hook takes in memoized columns and data to be displayed
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useSortBy
  );

  return (
    <>
      {/* apply the table props */}
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div> {/*Add column filter component in each column header  */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map((row, i) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
