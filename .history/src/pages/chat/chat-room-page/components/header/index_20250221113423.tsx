import { useState, useRef, useEffect } from "react";
import Icon from "../../../../../common/components/icons";
import Picker, { EmojiClickData } from "emoji-picker-react";  
import {
  Action,
  Actions,
  Container,
  Name,
  ProfileWrapper,
  Subtitle,
} from "./styles";
import AvatarCustom from "../../../components/avatar";
import { useChatContext } from "../../../../../pages/chat/context/chat";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../../../../hooks/use-firebase";
import { Button } from "../footer/styles";
import useIsDesktop from "pages/chat/hooks/useWindowSize";

type HeaderProps = {
  inbox?: any;
  onSearchClick: Function;
  onProfileClick: Function;
  title: string;
  image: string;
  subTitle: string;
};

export default function Header(props: HeaderProps) {
  
  const { title, subTitle, image, onProfileClick, onSearchClick } = props;
  const { getFromDatabase, updateDatabase, response } = useFirebase(); 
  const [editInfo, setEditInfo] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { chatSelected, numberSelected } = useChatContext();
  const params = useParams();
  const [nameUser, setNameUser] = useState(response?.name)
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getFromDatabase(`${numberSelected}/${params.id}`);
  }, [params.id]);

  useEffect(() => {
    if (editInfo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editInfo]);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInputStr((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onSendData = () => {
    if (inputStr.trim()) {
    
      updateDatabase(`${numberSelected}/${params.id}`, { nickname: inputStr })
        .then(() => {
          console.log("Nombre actualizado con éxito");
        })
        .catch((error) => {
          console.error("Error al actualizar el nombre:", error);
        });
    }
    setEditInfo(false);
  };

  useEffect(() => {
    setNameUser(response?.nickname || response?.name || title)
    setInputStr(response?.nickname || response?.name || title)
  }, [response])
  const navigate = useNavigate(); 

  const onCloseChat = () => {
    navigate("/init");
  }
  const isDesktop = useIsDesktop();

  return (
    <Container className={ isDesktop ? '' : 'fixed'}>
      <AvatarCustom name={props.inbox?.name} />

      <ProfileWrapper>
        <Name>{nameUser}</Name>
        {subTitle && <Subtitle>{subTitle}</Subtitle>}

        <button onClick={() => setEditInfo(!editInfo)}>
          <Icon id={editInfo ? "cancel" : "edit"} className="icon search-icon" />
        </button>

        {editInfo && (
          <div>
            <input
              type="text"
              ref={inputRef}
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
            />
            <button onClick={onSendData}>
              <Icon id="check" className="icon search-icon" />
            </button>

            <button onClick={() => setShowPicker((val) => !val)}>
              <Icon id="smiley" className="icon search-icon" />
            </button>

            {showPicker && <Picker onEmojiClick={onEmojiClick} />}
          </div>
        )}
      </ProfileWrapper>
      <Actions style={{marginRight: isDesktop ? '20px' : '10px'}}>
        <Action onClick={onSearchClick}>
          <Icon id="search" className="icon search-icon" />
        </Action>
        {
          !isDesktop &&   <Action onClick={onCloseChat}>
          <Icon id="cancel" className="icon" />
        </Action>
        }
      
      </Actions>
    </Container>
  );
}
