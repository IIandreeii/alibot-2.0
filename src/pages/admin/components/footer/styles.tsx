import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 17%;
    padding: 4px;
    position: absolute;
    bottom: 0;
    @media (max-width: 768px) {
        width: 100%;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0;
    }
    > a {
        background: rgb(242, 243, 247);
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: rgb(27, 166, 84);
    @media (max-width: 768px) {
        padding: 10px;

}
        &:hover {
            color: rgb(27, 166, 84);
            transform: scale(1.05);
            transition: .3s ease all;
        }
        i {
        margin-right: 10px;
        }
    }
    > div {
        background:#f2f3f7;
        padding: 10px 20px;    

    h3 {
        font-weight: 700;
        font-size: 24px;
    }
    p {
        font-size: 18px;
    }
}

`;