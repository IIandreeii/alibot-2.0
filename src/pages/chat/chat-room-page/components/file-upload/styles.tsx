import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #f8f8f8;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const AttachButton = styled.button<{ isRotated: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: ${(props) => (props.isRotated ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  .icon {
    font-size: 24px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -10px;
  left: -30px;
  z-index: 10;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #25d366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:disabled {
    background-color: #ccc;
  }
`;


export const Input = styled.input`
 width: 50%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 40px;
  margin: auto;
  background: white;
`;

export const SendMessageButton = styled.button`
  background-color: #25d366;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  .icon {
    font-size: 24px;
    color: white;
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

export const FilePreview = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }
  span {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #25d366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:disabled {
    background-color: #ccc;
  }
`;
