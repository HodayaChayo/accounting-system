import React, { useState } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const HamburgerIcon = styled.div`
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000;
`;

const MenuItems = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: #fff;
  padding: 10px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
`;

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContainer>
      <HamburgerIcon onClick={toggleMenu}>
        <Line />
        <Line />
        <Line />
      </HamburgerIcon>
      <MenuItems isOpen={isOpen}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuItems>
    </MenuContainer>
  );
};

export default HamburgerMenu;
