import React from 'react';
import Navbar from '../Menu/Navbar';
export default function Header(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <Navbar />
    </div>
  );
}
