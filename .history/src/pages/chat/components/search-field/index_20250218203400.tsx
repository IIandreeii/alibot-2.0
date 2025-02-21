import Icon from "common/components/icons";
import { SearchWrapper, IconContainer, Input } from "./styles";
import { useContext } from "react";
import { InputContext } from "pages/chat/context/filter";

type SearchFieldProps = {
  placeholder?: string;
  [x: string]: any;
};

export default function SearchField(props: SearchFieldProps) {
  const { placeholder, ...rest } = props;
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('InputComponent debe estar dentro de un InputProvider');
  }

  const { inputValue, setInputValue } = context;

  const onFilterMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onClear = () => {
    setInputValue("")
  }

  return (
    <SearchWrapper {...rest}>
      <IconContainer>
        <button className="search__back-btn" onClick={() => onClear()}>
          <Icon id="back" />
        </button>
      </IconContainer>
      <Input placeholder={placeholder ?? "Buscar"} value={inputValue} onChange={(e) => onFilterMessage(e)} />
    </SearchWrapper>
  );
}
