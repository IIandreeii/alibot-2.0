
import { useEffect } from 'react';


export const customMenuStyles = `
  .custom-menu .p-menu {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .custom-menu .p-menuitem {
    padding: 10px 20px;
    color: #333;
  }
  
  .custom-menu .p-menuitem .p-menuitem-icon {
    color: #007bff;
  }
  
  .custom-menu .p-menuitem .p-menuitem-text {
    font-weight: 500;
  }
`;

const applyCustomStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = customMenuStyles;
  document.head.appendChild(styleElement);
};

export const CustomStylesComponent = () => {
  useEffect(() => {
    applyCustomStyles();
  }, []);

  return null;
};