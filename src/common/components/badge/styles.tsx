import styled from "styled-components";

export const BadgeWrapper = styled.button`
  padding: 7px 12px;
  background-color: #f0f2f5;
  width: fit-content;
  flex: inherit;
  font-size: 14px;
  font-weight: 500;
  border-radius: 20px;

  &.active {
    background-color: #e7fce3;
    color: #008069;
  }
`;