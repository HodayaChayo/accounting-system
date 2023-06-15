import React, { Component }  from 'react';
export default function ColumnFilter({column}) {
  const { filterValue, setFilter } = column;
  return (
    <span>
      {/* Search:{' '} */}
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value);
        }}
        placeholder={`חיפוש`}
        style={{
          // fontSize: '1em',
          margin: '0.3rem 0',
        }}
      />
    </span>
  );
}
