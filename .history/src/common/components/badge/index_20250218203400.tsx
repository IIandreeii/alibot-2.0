import { useContext } from "react";
import { BadgeWrapper } from "./styles";
import { StateMessage, StateMessageContext } from "pages/chat/context/filterState";

interface Props {
  text: string;
  active?: boolean;
  value: any;
}

export default function BadgeMessage({ text, active, value }: Props) {
  const context = useContext(StateMessageContext);

  if (!context) {
    throw new Error('InputComponent debe estar dentro de un InputProvider');
  }

  const { setState, state } = context;

  const onSelectStatus = () => {
    setState(value);
  };  
  
  return (
    <BadgeWrapper className={value === state && 'active' || ''} onClick={() => onSelectStatus()}>
      {text}
    </BadgeWrapper>
  );
}
