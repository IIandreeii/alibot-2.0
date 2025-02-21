import React from 'react';
import styled from 'styled-components';

interface Props {
    type?: string;
    content: any;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  overflow-y: auto;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: ${(props: { isOpponent: boolean }) => (props.isOpponent ? 'row' : 'row-reverse')};
`;

const MessageBubble = styled.div`
  border-radius: 7.5px;
  position: relative;
`;

const MessageTimestamp = styled.span`
  font-size: 0.75rem;
  color: gray;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const OrderInfo = styled.div`
  font-size: 0.85rem;
  margin-top: 8px;
`;

const OrderField = styled.p`
  margin: 0;
  padding: 2px 0;
  font-weight: ${(props: { bold?: boolean }) => (props.bold ? 'bold' : 'normal')};
`;

export const Template = ({ type, content }: Props) => {
  const data = content?.data;
  const text = content?.content

  if (!data) {

    if (text && text.length > 0) {
      return (
        <ChatContainer>
          <MessageWrapper isOpponent={false}>
            <MessageBubble>
              <OrderInfo>
                <OrderField>{text}</OrderField>
              </OrderInfo>
            </MessageBubble>
          </MessageWrapper>
        </ChatContainer>
      )

    } else {

      return (
        <ChatContainer>
          <MessageWrapper isOpponent={false}>
            <MessageBubble>
              <OrderInfo>
                <OrderField bold>No se encontraron detalles de la orden.</OrderField>
              </OrderInfo>
            </MessageBubble>
          </MessageWrapper>
        </ChatContainer>
      );

    }

  }

  // Desestructuración segura
  const { customer = 'N/A', orderNumber = 'N/A', address = 'N/A', products = 'N/A', total = 'N/A' } = data;

  return (
    <ChatContainer>
      <MessageWrapper isOpponent={false}>
        <MessageBubble>
          <OrderInfo>
            <OrderField bold>Cliente: {customer}</OrderField>
            <OrderField bold>Número de orden: {orderNumber}</OrderField>
            <OrderField>Dirección: {address}</OrderField>
            <OrderField>Productos: {products}</OrderField>
            <OrderField>Total: S/ {total}</OrderField>
          </OrderInfo>
        </MessageBubble>
      </MessageWrapper>
    </ChatContainer>
  );
};
