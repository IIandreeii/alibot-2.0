import styled from "styled-components";

export const StatusWrapper = styled.div`
  overflow-x: auto;
  padding: 7px 10px;
  background: ${(props) => props.theme.common.secondaryColor};
  display: flex;
  gap: 10px;
  flex-rwap: wrap;
  row-gap: 8px;
  flex-shrink: 0;
`;