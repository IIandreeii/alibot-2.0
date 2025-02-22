import styled from "styled-components";

export const SidebarContainer = styled.aside`
  min-width: 300px;
  flex: 40%;
  border-right: 1px solid ${(props) => props.theme.common.borderColor};
  display: flex;
  flex-direction: column;
  &.isMobile {
    min-width: 100%;
  }

  @media screen and (min-width: 1000px) and (max-width: 1300px) {
    flex: 35%;

    & ~ div {
      flex: 65%;
    }
  }

  @media screen and (min-width: 1301px) {
    flex: 30%;

    & ~ div {
      flex: 70%;
    }
  }

  .icon {
    color: ${(props) => props.theme.common.headerIconColor};
  }
`;

export const Header = styled.header`
  background: ${(props) => props.theme.common.primaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 10px;
  min-height: 60px;
`;

export const ImageWrapper = styled.div`
  width: 80px;
  height: 40px;
`;

export const Avatar = styled.img`
  height: 100%;
  width: 80%;
  object-fit: cover;
`;

export const Actions = styled.div`
  margin-right: 20px;

  & > * {
    display: inline-block;
    margin-left: 25px;
    cursor: pointer;
  }
`;

export const ThemeIconContainer = styled.div`
  svg {
    margin-bottom: 2px;
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.common.headerIconColor};
  }
`;

export const ContactContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  background: ${(props) => props.theme.common.secondaryColor};
`;

export const InboxFilter = styled.div`
  h4 {
      padding-left: 32px;
      padding-top: 30px;
      padding-bottom: 15px;
      font-size: 16px;
      color: #008069;
  }
`;