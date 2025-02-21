import styled, { css } from "styled-components";

export const Container = styled.div`
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 5% 2pc;
  @media (max-width: 768px) {
    height: 82vh;
    flex: none;
    margin-bottom: 20px;
  }
  .icon {
    color: ${(props) => props.theme.common.subHeadingColor};
    margin-right: 5px;
    margin-bottom: -1px;
  }
`;

export const wrapperStyles = css`
  z-index: 9;
`;

export const DateWrapper = styled.div`
  text-align: center;
  margin: 10px 0 14px;
  position: relative;

  ${wrapperStyles}
`;

export const DateCustom = styled.span`
  background: ${(props) => props.theme.badge.bgColor};
  display: inline-block;
  color: ${(props) => props.theme.badge.textColor};
  font-size: 0.75rem;
  padding: 7px 10px;
  border-radius: 5px;
`;

export const EncryptionMessage = styled.p`
  background: ${(props) => props.theme.encryptionMessage.bgColor};
  color: ${(props) => props.theme.encryptionMessage.textColor};
  font-size: 0.77rem;
  text-align: center;
  padding: 5px 10px;
  position: relative;
  margin-bottom: 8px;
  border-radius: 5px;
  line-height: 20px;

  ${wrapperStyles}
`;

export const MessageGroup = styled.div`
  ${wrapperStyles}

  display: flex;
  flex-direction: column;
  position: relative;

  > div {
   &:last-child {
     @media (max-width: 768px) {
      margin-bottom: 6px;
    }
   }
  }
 

  .chat__msg--sent {
    background: ${(props) => props.theme.sentMessage.bgColor};
    align-self: flex-end;
    border-radius: 8px 8px 0 8px; 
  }

  .chat__msg--received {
    background: ${(props) => props.theme.receivedMessage.bgColor};
    align-self: flex-start;
    border-radius: 8px 8px 8px 0; 
  }

  & > *:nth-child(1):not(.chat__msg--sent)::before,
  .chat__msg--sent + .chat__msg--received::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: -8px;
    border-top: 6px solid ${(props) => props.theme.receivedMessage.bgColor};
    border-right: 6px solid ${(props) => props.theme.receivedMessage.bgColor};
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
  }

  & > *:nth-child(1):not(.chat__msg--received)::before,
  .chat__msg--received + .chat__msg--sent::before {
    right: -8px;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    border-top: 6px solid ${(props) => props.theme.sentMessage.bgColor};
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid ${(props) => props.theme.sentMessage.bgColor};
  }

  .chat__msg-status-icon {
    color: ${(props) => props.theme.common.subHeadingColor};
    margin-left: 3px;
  }

  .chat__msg-status-icon--blue {
    color: ${(props) => props.theme.common.readIconColor};
  }

  .chat__msg-link {
    color: ${(props) => props.theme.common.readIconColor};
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 1%; 
  right: 5px;
  display: none; 

  button {
    background-color: transparent;
    color: #6c757d; 
    border: none;
    border-radius: 4px;
    padding: 2px; 
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #343a40; 
    }
  }
`;

export const ChatMessage = styled.div`
  padding: 20px 12px 20px 12px; 
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: ${(props) => props.theme.common.mainHeadingColor};
  width: fit-content;
  max-width: 80%; 
  line-height: 20px;
  border-radius: 8px; 
  position: relative;
  white-space: pre-line;
  min-width: 100px;
  word-wrap: break-word; 

  @media screen and (min-width: 1301px) {
    max-width: 70%;
  }

  @media screen and (min-width: 1000px) and (max-width: 1300px) {
    max-width: 75%;
  }

  @media screen and (min-width: 900px) and (max-width: 1000px) {
    max-width: 85%;
  }

  &:hover ${ButtonContainer} {
    display: block;
    
  }
`;

export const ChatMessageFiller = styled.span`
  width: 65px;
  display: inline-block;
  height: 3px;
  background: transparent;
`;

export const ChatMessageFooter = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 7px;
  bottom: 0;
  color: ${(props) => props.theme.common.subHeadingColor};
  font-size: 0.7rem;
  font-weight: 500;
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
`;