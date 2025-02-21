import { useState } from "react";
import Icon from "../../../../common/components/icons";
import useCloseMenu from "../../hooks/useCloseMenu";
import { Container, Button, Options, Option } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type OptionsMenuProps = {
  iconClassName?: string;
  className?: string;
  iconId: string;
  ariaLabel?: string;
  options: string[];
  position?: string;
  showPressed?: boolean;
  [x: string]: any;
};

export default function OptionsMenu(props: OptionsMenuProps) {
  const [showOptions, setShowOptions] = useState(false);
  
  const navigate = useNavigate();
  const ref = useCloseMenu(() => setShowOptions(false));
  const {
    iconId,
    options,
    ariaLabel,
    className,
    iconClassName,
    position = "left",
    showPressed = true,
  } = props;

  const getBtnClassName = (): string => {
    let _className = showOptions && showPressed ? "btn-pressed " : "";
    _className += className ?? "";

    return _className;
  };

  const getOptionsClassName = (): string => {
    let className = showOptions ? "active " : "";
    className += position === "right" ? "right" : "";

    return className;
  };

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const onRedirect = () => {
    navigate('/admin');
  }

  
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <Container ref={ref}>
      <Button aria-label={ariaLabel} className={getBtnClassName()} onClick={handleClick}>
        <Icon id={iconId} className={iconClassName} />
      </Button>
      
      <Options className={getOptionsClassName()}>
        <Option onClick={() => onRedirect()}>{'Configuracion'}</Option>

        {options.map((option) => (
          <Option key={option} onClick={() => onLogout()}>{option}</Option>
        ))}
        
      </Options>
    </Container>
  );
}
