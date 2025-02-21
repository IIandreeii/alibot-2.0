import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'common/components/icons';
import useCloseMenu from '../../../hooks/useCloseMenu';

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const MenuContent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Asegúrate de que el menú tenga un z-index alto */
  border-radius: 5px;
  padding: 10px;
  right: 0;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropdownMenu = ({ onConfirm, onDiscard }) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useCloseMenu(() => setShowMenu(false));

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <MenuContainer ref={ref}>
      <MenuButton onClick={toggleMenu}>
        <Icon id="pinned" className="sidebar-contact__icon" />
      </MenuButton>
      <MenuContent show={showMenu}>
        <MenuItem onClick={onDiscard}>Descartar chat</MenuItem>
        <MenuItem onClick={onConfirm}>Confirmar</MenuItem>
      </MenuContent>
    </MenuContainer>
  );
};

export default DropdownMenu;