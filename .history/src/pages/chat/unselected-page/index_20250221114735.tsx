import ChatLayout from "../layouts";
import Icon from "../../../common/components/icons";
import { useAppTheme } from "common/theme";
import { Container, ImageWrapper, Title, IconWrapper, Link, Image, Text } from "./styles";
import useIsDesktop from "../hooks/useWindowSize";

export default function UnSelectedChatPage() {
  const theme = useAppTheme();
  const isDesktop = useIsDesktop();

  const getImageURL = () => {
    if (theme.mode === "light") return "/assets/logo.png";
    return "/assets/logo_white.png";
  };


  return (
    <ChatLayout>
      {
        isDesktop && <Container>
        <ImageWrapper>
          <Image src={getImageURL()} />
        </ImageWrapper>
        <Title> Alibot Web </Title>
        <Text>
          ©2024 Alibot SAC Todos Derechos Reservados
        </Text>
      </Container>
      }
      
    </ChatLayout>
  );
}
