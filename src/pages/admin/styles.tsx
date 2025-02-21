import styled, { css } from "styled-components";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: #f2f3f7;
  padding: 10px;
`;

export const ContainerRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  position: relative;
 
`;
