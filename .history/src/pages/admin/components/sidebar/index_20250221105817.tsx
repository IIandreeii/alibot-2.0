import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { usePhoneNumberWithLoader } from '../../../../services/phone-number/getPhoneNumber.service';
import { useChatContext } from 'pages/chat/context/chat';
import { useChatContext } from '../../';
import { Container, CardContainer, StyledDialog } from './styles';
import Card from '../card';
import UserForm from '../form';

export const Sidebar = ({ onCardClick }: { onCardClick: (phone: string) => void }) => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loaderService, setLoaderService] = useState(false);
  const { getPhoneNumber, putPhoneDisabled, getResponse } = usePhoneNumberWithLoader();
  const [userId, setUserId] = useState({ action: 'edit', id: null, phoneNumberId: null, tokenMeta: null, nickname: null, wabaId: null, phone: null, openaiApiKey: null });
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const { showMessageDialog, setShowMessageDialog } = useChatContext();

  useEffect(() => {
    if (!loaderService) {
      getPhoneNumber();
    }
  }, [loaderService]);

  const filteredPhones = getResponse?.filter((phone) =>
    phone?.phoneNumberId?.includes(searchTerm)
  );

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <strong key={index} style={{ color: 'black' }}>{part}</strong>
      ) : (
        part
      )
    );
  };

  const onCloseModal = () => {
    setVisible(false);
    setUserId({ action: 'edit', id: null, phoneNumberId: null, tokenMeta: null, nickname: null, wabaId: null, phone: null, openaiApiKey: null });
    setIsDeletingUser(false);
  };

  useEffect(() => {
    setShowMessageDialog(true)

    setTimeout(() => {
      if (userId?.action === 'edit' && userId.phoneNumberId) {
        setShowMessageDialog(false)

        setVisible(true);
        setIsDeletingUser(false);
      }

      if (userId?.action === 'delete' && userId.phoneNumberId) {
        confirmDeleteUser(userId.id);
      }

      if (userId?.action === 'create') {
        setShowMessageDialog(false)
      }

    }, 100);
  }, [userId, visible]);

  const confirmDeleteUser = (userID: any) => {
    const targetElementModal = document.querySelector(`#sidebar-${userID}`) as HTMLElement;

    setIsDeletingUser(true);

    confirmPopup({
      appendTo: targetElementModal as HTMLElement,
      message: '¿Estás seguro de eliminar al usuario?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        onDeleteUser(userID);
        setIsDeletingUser(false);
      },
      reject: () => setIsDeletingUser(false),
    });

    const targetElementDom = document.querySelector(`#sidebar-${userID}`) as HTMLElement;
    const parentScrollContainer = document.getElementById('sidebar') as HTMLElement;

    if (targetElementDom && parentScrollContainer) {
      const targetOffsetTop = targetElementDom.offsetTop;
      const targetHeight = targetElementDom.offsetHeight;
      const containerHeight = parentScrollContainer.clientHeight;

      const newScrollTop = targetOffsetTop - (containerHeight / 2) + (targetHeight / 2);

      parentScrollContainer.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    }
  };

  const onDeleteUser = async (userID: any) => {
    await putPhoneDisabled({ isActive: false }, userID);
    await getPhoneNumber();
  };

  const onAddUser = () => {
    setUserId({ action: 'create', id: null, phoneNumberId: null, tokenMeta: null, nickname: null, wabaId: null, phone: null, openaiApiKey: null });
    setVisible(true);
  };

  console.log('xasddasdsad', filteredPhones);


  return (
    <Container>
      <div>
        <input
          type="text"
          placeholder="Buscar número..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button label="Agregar número" icon="pi pi-plus-circle" iconPos="right" onClick={() => onAddUser()} />
      </div>

      <CardContainer id='sidebar'>
        {loaderService ? <p>Cargando...</p> :
          filteredPhones?.map((phone: any) => (
            <Card
              key={phone.id}
              id={`sidebar-${phone.id}`}
              data={phone}
              phone={highlightMatch(phone.nickname)}
              onCardClick={() => {
                setShowMessageDialog(false)
                onCardClick(phone.id)

              }}
              setUserId={setUserId} />
          ))}
        {showMessageDialog && <ConfirmPopup className={"toast_delete"} />}
      </CardContainer>

      <StyledDialog
        visible={visible}
        onHide={onCloseModal}
        style={{ width: '30vw', borderRadius: '15px', overflow: 'hidden' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <div style={{ padding: '1rem' }}>
          <UserForm closeModal={onCloseModal} setLoaderService={setLoaderService} dataEdit={userId} isDeletingUser={isDeletingUser} />
        </div>
      </StyledDialog>
    </Container>
  );
};