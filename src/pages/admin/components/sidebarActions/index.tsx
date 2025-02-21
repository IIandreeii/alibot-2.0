import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/primereact.min.css';  // Componentes
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema
import LoaderComponent from '../../../chat/components/loader';
import useWindowSize from "../../../chat/hooks/useWindowSize";

const SidebarContainer = styled.div<{ isOpen: boolean, isDesktop: boolean }>`
  grid-column: span 3 / span 3;
  padding: 15px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  padding-top: 0;
  position: relative;
  @media (max-width: 768px) {
    position: fixed;
    top: 90px;
    background: white;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding-top: 20px;
  }
  ${({ isOpen, isDesktop }) => !isOpen ? isDesktop ? '' : `grid-column: span 1 / span 1;` : ''}
`;

const SidebarHeader = styled.div`
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333742;
  border-bottom: 1px solid #e0e0e0;
`;

const MenuItem = styled(motion.div) <{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 3px 4px 7px 1px;
  margin: 10px 0;
  border-radius: 10px;
  transition: background-color 0.3s;
  position: relative;
  ${({ isActive }) =>
    isActive &&
    `
    color: #15c; 
    border-color: #15c;
    p {
      font-weight: 600;
      color: #15c !important;
      font-size: 15px;
    }
  `}

  &:hover {
    background-color: #e0e0e0;
  }

  i {
    margin-right: 10px;
  }
  button {
    i {
      font-size: 12px;
    }
  }
    > div {
        p {
            display: flex;
            flex-direction: column;
            font-weight: 600;
            margin-top: -5px !important;
            span {
                font-weight: 400;
            }
        } 
    }
`;

const SidebarContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

interface SidebarActionsProps {
  isOpen: boolean;
  selectedPhone: string;
}

const SidebarActions: React.FC<SidebarActionsProps> = ({ isOpen, selectedPhone }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [key, setKey] = useState(0);
  const isDesktop = useWindowSize();

  const [hasChange, setHasChange] = useState(false)

  useEffect(() => {
    setHasChange(true)
    const id = searchParams.get('id');
    if (id) {
      setKey((prev) => prev + 1);
    }

    setTimeout(() => setHasChange(false), 500);
  }, [searchParams.get('id')]);

  const menuItems = [
    { icon: 'pi pi-clipboard', label: 'Plantilla', action: '1', description: 'Gestion de plantillas META.' },
    { icon: 'pi pi-send', label: 'Respuestas Rápidas', action: '2', description: 'Gestion los mensajes automáticos.' },
    { icon: 'pi pi-box', label: 'Tienda', action: '3', description: 'Gestion de tiendas SHOPIFY.' },
    { icon: 'pi pi-gift', label: 'Productos', action: '4', description: 'Gestion de productos.' },
  ];

  const onToggleAction = (action: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('id', selectedPhone);
    updatedParams.set('acc', action);
    setSearchParams(updatedParams, { replace: true });
  };

  const onToggleActionRemove = () => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.delete('phone');
    updatedParams.delete('id');

    setSearchParams(updatedParams, { replace: true });
  };

  return (
    <SidebarContainer isOpen={!searchParams.get('acc')} isDesktop={!isDesktop}>

      {!isDesktop && <div className="actionsReturn">
        <button onClick={() => onToggleActionRemove()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>}

      <SidebarContent key={key}>
        {isDesktop && <Tooltip target=".custom-target-icon" className='custom_tooltip' />}

        {menuItems.map((item, index) => (
          <MenuItem
            key={item.action}
            isActive={searchParams.get('acc') === item.action}
            onClick={() => onToggleAction(item.action)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.2 }}
            className="custom-target-icon"
            data-pr-tooltip={item.label}
            data-pr-position="right"
            data-pr-at="right+5 top"
            data-pr-my="left center-2"
          >

            <div style={{ display: 'flex' }}>
              <i className={item.icon}></i>
              {
                !searchParams.get('acc') &&
                <p>
                  {item.label}
                  <span>{item.description}</span>
                </p>
              }


            </div>
            <button>
              <i className='pi pi-chevron-right'></i>
            </button>
          </MenuItem>
        ))}
      </SidebarContent>

      {hasChange && <LoaderComponent />}
    </SidebarContainer>
  );
};

export default SidebarActions;
