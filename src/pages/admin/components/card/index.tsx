import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { useSearchParams } from 'react-router-dom';

const CardContainer = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;
  cursor: pointer;
  position: relative;
  ${({ isActive }) =>
    isActive &&
    `
    color: #15c; 
    border-color: #15c;
    p {
        font-weight: 600;
        color: #15c !important;
        font-size: 14px;
    }
  `}
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface CardProps {
  id: any;
  data: any;
  phone: React.ReactNode;
  onCardClick: (phone: string) => void;
  setUserId: (userId: { 
    action: string; id: any; phoneNumberId: any; tokenMeta: any; nickname: any, wabaId: any , phone: any, openaiApiKey: any, isAssistantAi: any
  }) => void;
}

const Card: React.FC<CardProps> = ({ id, data, phone, onCardClick, setUserId, ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const menuRef = React.useRef<any>(null);

  const handleMenuClick = (event: React.MouseEvent) => {
    event.preventDefault();
    menuRef.current?.toggle(event);
  };

  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    setSearchParams({ id: data.id.toString(), phone: data.phoneNumberId }, { replace: true });
    onCardClick(String(phone));
  };

  const items = [
    {
      label: 'Editar',
      icon: 'pi pi-user-edit',
      command: () =>
        setUserId({
          action: 'edit',
          id: data.id,
          phoneNumberId: data.phoneNumberId,
          tokenMeta: data.tokenMeta,
          nickname: data.nickname,
          wabaId: data.wabaId,
          phone: data.phone,
          openaiApiKey: data.openaiApiKey,
          isAssistantAi: data.isAssistantAi
        }),
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () =>
        setUserId({
          action: 'delete',
          id: data.id,
          phoneNumberId: data.phoneNumberId,
          tokenMeta: data.tokenMeta,
          nickname: data.nickname,
          wabaId: data.wabaId,
          phone: data.phone,
          openaiApiKey: data.openaiApiKey,
          isAssistantAi: data.isAssistantAi
        }),
    },
    {
      label: 'Duplicar',
      icon: 'pi pi-trash',
      command: () =>
        setUserId({
          action: 'duplicate',
          id: data.id,
          phoneNumberId: data.phoneNumberId,
          tokenMeta: data.tokenMeta,
          nickname: data.nickname,
          wabaId: data.wabaId,
          phone: data.phone,
          openaiApiKey: data.openaiApiKey,
          isAssistantAi: data.isAssistantAi
        }),
    },
  ];

  return (
    <CardContainer 
      onClick={handleCardClick} 
      id={`${id}`} 
      isActive={searchParams.get('id') === data.id.toString()} {...props}>
        <p style={{ color: '#2c2c2c' }}>{phone} - {data.phone || 'S/N'}</p>
      <Button icon="pi pi-ellipsis-v" onClick={handleMenuClick} className="p-button-text" />
      
    </CardContainer>
  );
};

export default Card;
