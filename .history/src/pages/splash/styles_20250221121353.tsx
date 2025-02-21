import Icon from "../../common/components/icons";
import styled, { css } from "styled-components";

export const theme = {
  splash: {
    bg: '#f0f0f0',
    gradient: 'linear-gradient(90deg, rgba(0,216,187,1) 0%, rgba(0,216,187,0) 100%)',
    logoFill: '#000',
    progressBg: '#e0e0e0',
    progressAfterBg: '#00d8bb',
    titleColor: '#333',
    subTitleColor: '#666',
    iconColor: '#00d8bb',
  },
};

export const LogoWrapper = styled.div`
  position: relative;
  img {
    height: 90px;
  }

  &::after {
    content: "";
    position: absolute;
    left: -100px;
    bottom: 0;
    top: 0;
    width: 100px;
    background: ${(props) => props.theme.splash.gradient}
    animation: glisten 2s ease-in 0.8s infinite;
  }

  @keyframes glisten {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(150px);
    }
  }
`;

export const Logo = styled(Icon)`
  z-index: 3;
  fill: ${(props) => props.theme.splash.logoFill};
  width: 60px;
  height: 60px;
`;

export const Progress = styled.div<{ progess: number }>`
  width: 200px;
  max-width: 400px;
  height: 4px;
  width: 90%;
  margin: 20px auto 30px;
  background: ${(props) => props.theme.splash.progressBg};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    /* background: rgb(0, 216.5, 187.0288); */
    background: ${(props) => props.theme.splash.progressAfterBg};
    transition: width 2s linear;

    ${(props) => css`
      width: ${props.progess}%;
    `};
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.splash.titleColor};
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  color: ${(props) => props.theme.splash.subTitleColor};
  font-size: 0.85rem;
`;

export const EncryptionIcon = styled(Icon)`
  color: ${(props) => props.theme.splash.iconColor};
`;

export const Link = styled.a`
  text-decoration: revert-layer;

  &:hover {
    text-decoration: revert-layer;
  }
`;
