import React from 'react';
import { createPortal } from 'react-dom';
import { useFloatingMenu } from './FloatingMenuContext';
import { FloatingMenu as StyledFloatingMenu } from './styles';

const FloatingMenu = () => {
  const { isVisible, position, hideMenu } = useFloatingMenu();

  if (!isVisible) return null;

  return createPortal(
    <StyledFloatingMenu style={{ top: position.top, left: position.left }}>
      <ul>
        <li onClick={hideMenu}>Pedido</li>
        <li onClick={hideMenu}>Descartar Chat</li>
      </ul>
    </StyledFloatingMenu>,
    document.body
  );
};

export default FloatingMenu;