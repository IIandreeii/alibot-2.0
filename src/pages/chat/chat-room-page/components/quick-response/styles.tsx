import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 2.5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #ff5c5c;
  }
`;

export const Tabs = styled.div`
margin-top: 20px;
display: flex;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#3C58A4' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#3C58A4')};
  padding: 10px;
  border: 2px solid #3C58A4;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  flex: 1;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props: any) => (props.active ? '#0069d9' : '#f1f1f1')};
  }
`;

export const TabContent = styled.div`
  padding: 10px;
  border-top: 2px solid #3C58A4;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  &:hover {
    background: #f1f1f1;
  }
`;