import React from 'react';

const handleClick = (e) => {
  e.preventDefault();
  console.log('The link was clicked.');
}

export default function Button(props) {


  return (
    <button onClick={handleClick}>
      {props.text}
      {props.fun()}
    </button>
  );
}
