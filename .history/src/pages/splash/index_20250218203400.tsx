import {
  Container,
  EncryptionIcon,
  Link,
  Logo,
  LogoWrapper,
  Progress,
  SubTitle,
  Title,
} from "./styles";

type SplashPageProps = {
  progress: number;
};

export default function SplashPage(props: SplashPageProps) {
  const { progress } = props;

  return (
    <Container>
      <LogoWrapper>
        <img src="/assets/logo.png" alt="" />
      </LogoWrapper>
      <Progress progess={progress} />
      <Title>Alibot</Title>
      <SubTitle>
        ©2024 Alibot SAC Todos Derechos Reservados
      </SubTitle>
    </Container>
  );
}
