import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  &.isMobile {
    position: fixed;
    z-index: 99999;
    background: rgb(237, 237, 237);
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    @media (max-width: 768px) {
    }
  }
`;

export const Body = styled.div`
  min-width: 300px;
  flex: 40%;
  border-right: 1px solid ${(props) => props.theme.common.borderColor};
  display: flex;
  flex-direction: column;
  position: static;
  z-index: 1;
  @media (max-width: 768px) {
  }
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.05;
  z-index: 1;
  background: url("/assets/images/bg-chat-room.png") ${(props) => props.theme.chatRoom.bg};
`;

export const FooterContainer = styled.div`
  background: ${(props) => props.theme.common.primaryColor};
  z-index: 100;
  @media (max-width: 768px) {
    height: 9vh;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 80px;
  width: 42px;
  height: 42px;
  z-index: -1;
  border-radius: 50%;
  color: ${(props) => props.theme.common.subHeadingColor};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.common.secondaryColor};
  box-shadow: ${(props) => props.theme.chatRoom.scrollBtnBoxShadow};
  z-index: 10;
  @media (max-width: 768px) {
  bottom: 120px;
  }
`;

export const customMenuStyles = `
.custom-menu .p-menu {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.custom-menu .p-menuitem {
  border-radius: 10px;
  margin: 5px 0;
}

.custom-menu .p-menuitem-link {
  border-radius: 10px;
  padding: 10px 15px;
}

.custom-menu .p-menuitem-link:hover {
  background-color: #f0f0f0;
}
`;


