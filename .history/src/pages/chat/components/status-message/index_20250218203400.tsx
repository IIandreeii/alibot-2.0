import BadgeMessage from "common/components/badge";
import { StatusWrapper } from "./styles";

export default function StatusMessage() {

  return (
    <StatusWrapper>
      <BadgeMessage text="Todos" value="all" active />
      <BadgeMessage text="No leídos" value="sent" active />
      <BadgeMessage text="Por confirmar" value="not_confirmed" />
      <BadgeMessage text="Confirmados" value="confirmed" />
    </StatusWrapper>
  );
}
