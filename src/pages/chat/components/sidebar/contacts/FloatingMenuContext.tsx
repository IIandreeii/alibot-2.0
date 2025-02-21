import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FloatingMenuContextProps {
  isVisible: boolean;
  position: { top: number; left: number };
  showMenu: (position: { top: number; left: number }) => void;
  hideMenu: () => void;
  toggleMenu: (position: { top: number; left: number }) => void;
}

const FloatingMenuContext = createContext<FloatingMenuContextProps | undefined>(undefined);

export const FloatingMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const showMenu = (position: { top: number; left: number }) => {
    setPosition(position);
    setIsVisible(true);
  };

  const hideMenu = () => {
    setIsVisible(false);
  };

  const toggleMenu = (position: { top: number; left: number }) => {
    setPosition(position);
    setIsVisible(!isVisible);
  };

  return (
    <FloatingMenuContext.Provider value={{ isVisible, position, showMenu, hideMenu, toggleMenu }}>
      {children}
    </FloatingMenuContext.Provider>
  );
};

export const useFloatingMenu = () => {
  const context = useContext(FloatingMenuContext);
  if (!context) {
    throw new Error('useFloatingMenu must be used within a FloatingMenuProvider');
  }
  return context;
};