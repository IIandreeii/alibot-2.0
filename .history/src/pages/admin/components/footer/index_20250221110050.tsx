import React from 'react'
import { Container } from './styles'
import { Link } from 'react-router-dom'
import { useChatContext } from 'pages/chat/context/chat';
import { useChatContext } from '../../../../pages/chat/context/chat';

export const Footer = () => {
  const chatCtx = useChatContext();

  return (
    <Container>
      <Link to={'/init'} onClick={() => {
        chatCtx.setChatSelected(null);
      }}>
        <i className='pi pi-arrow-left'></i>
        Volver a chats
      </Link>
    </Container>
  )
}
