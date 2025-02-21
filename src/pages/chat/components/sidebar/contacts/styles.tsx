import Icon from "../../../../../common/components/icons";
import styled, { css } from "styled-components";

export const Contact = styled.div<{ isActive?: boolean }>`
  height: 72px;
  overflow: hidden;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.common.primaryColor};
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    css`
      background-color: ${(props) => props.theme.common.primaryColor};
    `};

  &:hover {
    background-color: ${(props) => props.theme.common.primaryColor};
  }

  .sidebar-contact__icons  span {
      background: #25d366; 
      display: inline-block;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #fff;
      padding: 3px;
      box-sizing: content-box;
      font-size: 14px;
    }

  .sidebar-contact__icons,
  &:not(:focus) .sidebar-contact__icons {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(24px);
    transition: transform 0.5s ease;
  }

  &:hover .sidebar-contact__icons {
    transform: translateX(0);
  }

  .sidebar-contact__icons > button {
    margin-left: 8px;
    color: ${(props) => props.theme.common.headerIconColor};
  }

  .icon {
    color: ${(props) => props.theme.common.primaryColor};
  }
`;

export const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  overflow: hidden;
  flex: 1;
`;

export const contentStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopContent = styled.div`
  margin-bottom: 2px;

  ${contentStyles}
`;

export const messageStyles = css`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Name = styled.h2`
  color: ${(props) => props.theme.common.mainHeadingColor};
  font-size: 1rem;
  strong {
    color: #008069;
  }
  ${messageStyles}
`;

export const Time = styled.span`
  font-size: 0.7rem;
  color: ${(props) => props.theme.common.subHeadingColor};
`;

export const BottomContent = styled.div`
  ${contentStyles}
`;

export const MessageWrapper = styled.div`
  color: ${(props) => props.theme.common.subHeadingColor};
  font-size: 0.85rem;
  margin-right: 3px;
  overflow: hidden;

  ${contentStyles}
`;

export const MessageStatusIcon = styled(Icon)<{ isRead?: boolean }>`
  ${(props) =>
    props.isRead &&
    css`
      color: ${(props) => props.theme.common.readIconColor};
    `};
`;

export const Subtitle = styled.span`
  margin-left: 3px;
  flex-grow: 1;
  overflow: hidden;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: transparent;
  strong {
    color: #008069;
  }
`;

export const UnreadContact = styled.span`
  display: inline-block;
  color: ${(props) => props.theme.common.secondaryColor} !important;
  background-color: ${(props) => props.theme.common.tertiaryColor};
  border-radius: 18px;
  min-width: 18px;
  height: 18px;
  padding: 0 3px;
  line-height: 18px;
  vertical-align: middle;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const StyledButton = styled.button`
  padding: 2.5px 5px;
  background-color: transparent; /* Fondo transparente */
  border: 2px solid transparent; /* Borde azul */
  border-radius: 5px;
  color: transparent; /* Color de texto azul */
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1); /* Fondo transparente con un tono azul al pasar el ratón */
  }

  &:active {
    background-color: rgba(0, 123, 255, 0.2); /* Fondo transparente con un tono azul cuando el botón está presionado */
    box-shadow: 0 0 8px transparent; /* Sombra al presionar */
  }

  &:focus {
    outline: none; /* Eliminar el contorno predeterminado */
    background-color: rgba(0, 123, 255, 0.2); /* Fondo transparente con un tono azul cuando el botón está enfocado */
    box-shadow: 0 0 8px transparent; /* Sombra al enfocar */
  }
`;

export const FloatingMenu = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 8px;
  overflow: hidden;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: #f0f0f0;
  }
`;