import React from 'react';
import HamburgerMenu from '../Menu/HamburgerMenu';
export default function Header(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <HamburgerMenu />
    </div>
  );
}
