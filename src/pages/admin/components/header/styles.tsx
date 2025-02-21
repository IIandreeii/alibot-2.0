import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
     background:#f2f3f7;
    padding: 10px 20px;    

    h3 {
        font-weight: 700;
        font-size: 24px;
        img {
        width: 120px;
        }
    }
    p {
        font-size: 18px;
    }

}

`;