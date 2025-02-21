import styled, { css } from "styled-components";

export const Wrapper = styled.div`
 
  padding: 10px;
  height: 60px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    rigth: 0;
    
    background: #ededed;
  }
  /* should be refactor to one wrapper. using multiple places */
`;

export const iconCommonStyles = css`
  color: ${(props) => props.theme.common.subHeadingColor};
`;

export const IconsWrapper = styled.div`
`;

export const AttachButton = styled.button<{ isRotated: boolean }>`
  margin-left: 10px;

  .icon {
    ${iconCommonStyles}
    transition: transform 0.3s ease;
    transform: ${({ isRotated }) => (isRotated ? "rotate(180deg)" : "rotate(45deg)")};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  position: absolute;
  bottom: 20px;
  z-index: 10000;
  max-width: 92%;
  padding: 9px 0;
  overflow: visible;
  text-align: left;
  padding-bottom: 30px;
  width: 100%;
  height: 100%;
  bottom: 45px; 
  justify-content: center;}
  items-align: center;

  > div {
      &:first-child {
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
      }
    &:last-child {
        padding: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 5px 0 rgba(11, 20, 26, .26), 0 2px 10px 0 rgba(11, 20, 26, .16); 
        width: fit-content;
        position: absolute;
        bottom: 8px;
    }
    > div {
     display: flex;
     flex-direction: column; 
     align-items: center;

     button {
      display: flex;
      align-items: center;
      margin: 0;
      margin-bottom: 10px; 
     }
     label {
      margin-left: 10px;
      width: max-content;
      display: inline-block;
     }
     svg {
         fill: #007bfc;
     }
    }
  }
`;
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: black;
  border-radius: 3px;
  margin: 10px auto; 
`;

export const Button = styled.button`
  transition: all 0.5s ease;
  margin-bottom: 10px; 

  &:nth-of-type(1) {
    transition-delay: 0.25s;
  }

  &:nth-of-type(2) {
    transition-delay: 0.2s;
  }

  &:nth-of-type(3) {
    transition-delay: 0.15s;
  }

  &:nth-of-type(4) {
    transition-delay: 0.1s;
  }

  &:nth-of-type(5) {
    transition-delay: 0.05s;
  }
`;

export const Input = styled.input`
  /* background: white; */
  /* color: rgb(74, 74, 74); */
  background: ${(props) => props.theme.common.secondaryColor};
  color: ${(props) => props.theme.common.subHeadingColor};

  padding: 20px 10px;
  border-radius: 10px;
  flex: 1;
  height: 100%;
  margin-left: 7px;

  /* &::placeholder {
  color: rgb(153, 153, 153);
} */

  &::placeholder {
    /* color: rgb(74, 74, 74); */
    color: ${(props) => props.theme.common.subHeadingColor};
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
  }
`;

export const SendMessageButton = styled.button`
  .icon {
    margin-left: 8px;
    margin-right: 8px;
    width: 28px;
    height: 28px;
    padding: 3px;
    border-radius: 50%;
    ${iconCommonStyles}
  }
`;

export const SendQuickResponsButton = styled.button`
  .icon {
    margin-left: 8px;
    margin-right: 8px;
    width: 28px;
    height: 28px;
    padding: 3px;
    border-radius: 50%;
    ${iconCommonStyles}
  }
`;