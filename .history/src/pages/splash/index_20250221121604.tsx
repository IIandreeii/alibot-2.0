import React from 'react';
import { Container, LogoWrapper, Logo, Progress, Title, SubTitle, EncryptionIcon, Link } from './styles';

type SplashPageProps = {
  progress: number;
};

const SplashPage: React.FC<SplashPageProps> = ({ progress }) => {
  return (
    <Container>
      <LogoWrapper>
        <img src="/assets/logo.png" alt="Logo" />
      </LogoWrapper>
      <Progress progess={progress} />
      <Title>Alibot</Title>
      <SubTitle>©2024 Alibot SAC Todos Derechos Reservados</SubTitle>
    </Container>
  );
};

export default SplashPage;