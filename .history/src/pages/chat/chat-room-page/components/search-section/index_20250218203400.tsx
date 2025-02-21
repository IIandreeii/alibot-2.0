import React, { useEffect, useRef, useState } from "react";
import { Content, Search } from "./styles";
import { IconContainer, Input, SearchWrapper } from "pages/chat/components/search-field/styles";
import Icon from "common/components/icons";
import MessagesList from "../messages-list";
import useChatRoom from "../../hooks/useChatRoom";

export default function SearchSection() {
  const [searchTerm, setsearchTerm] = useState("hola")
  const messagesListRef = useRef<HTMLDivElement>(null);  
  const {
    setShouldScrollToBottom,
  } = useChatRoom();

  const onSearchMessage = (e) => {
    setsearchTerm(e.target.value)
  }

  useEffect(() => {
    setsearchTerm("")
  }, [])

  return (
    <React.Fragment>
       <SearchWrapper>
        <IconContainer>
          <Icon id="search" className="search-icon" />
          <button className="search__back-btn">
            <Icon id="back" />
          </button>
        </IconContainer>
        <Input placeholder={ "Buscar"} onChange={(e) => onSearchMessage(e)} />
      </SearchWrapper>
      <Content>
        {
          searchTerm !== ""
          && <MessagesList
              ref={messagesListRef}
              onMessagesLoaded={() => setShouldScrollToBottom(true)}
              searchTerm={searchTerm}  
              filterInChat={false}
            />
        }
        
      </Content>
    </React.Fragment>
  );
}
