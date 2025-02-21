import styled, { css } from "styled-components";

export const Container = styled.aside`
  background: ${(props) => props.theme.common.secondaryColor};
  color: ${(props) => props.theme.common.mainHeadingColor};
  text-align: center;
  font-size: 0.85rem;
 
  padding: 10px 0;
  cursor: pointer;
  position: relative;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  p {
    font-size: 16px;
    font-weight: 600;
  }
  span {
    color: #25d366;
  }
  svg {
    color: #25d366;
  }
`;

export const ContainerList = styled.ul`
  width: 100%;
  position: absolute;
  top: 100%;
  z-index: 9;
  background: ${(props) => props.theme.common.secondaryColor};
  box-shadow: 0 1px 3px rgba(11, 20, 26, .08);
  overflow-y: auto;
  height: 60vh;

  li {
    width: 100%;
    padding: 13px;
    &:hover {
      background: #f5f6f6;
    }
      &.active {
        background: #f0f2f5;
      }
  }
`;

//border-top: 1px solid #e9edef;