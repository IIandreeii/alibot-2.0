import styled from "styled-components";
import SearchField from "pages/chat/components/search-field";

export const Search = styled(SearchField)`
  /* common styles for bottom border */
  border-bottom: 1px solid ${(props) => props.theme.common.borderColor};
  /* common styles for bottom border */
`;

export const Content = styled.div`
  background: ${(props) => props.theme.common.secondaryColor};
  height: 100%;
  color: ${(props) => props.theme.common.mainHeadingColor};
  text-align: center;
  font-size: 0.85rem;
  height: 86vh;
  overflow-y: auto;
`;
