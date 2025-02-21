import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 320px;
  background: ${(props) => props.theme.common.secondaryColor};
  color: ${(props) => props.theme.common.mainHeadingColor};
  text-align: center;
  font-size: 0.85rem;
  padding: 10px 0;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  h4 {
    font-size: 14px;
    font-weight: 600;
    margin: 5px 0;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  a {
    &:last-child {
      color: #027eb5;
    }
  }
`;