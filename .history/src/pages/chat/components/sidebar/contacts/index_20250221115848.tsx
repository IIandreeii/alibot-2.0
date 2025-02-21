import Icon from "../../../../../common/components/icons";
import { InboxChat } from "../../../.../../../../common/types/common.type";
import { ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";

import {
  AvatarWrapper,
  BottomContent,
  Contact,
  Content,
  MessageStatusIcon,
  MessageWrapper,
  Name,
  StyledButton,
  Subtitle,
  Time,
  TopContent,
  FloatingMenu as StyledFloatingMenu,
} from "./styles";
import { InputContext } from "pages/chat/context/filter";
import { useChatContext } from "pages/chat/context/chat";
import AvatarCustom from "../../avatar";
import { isValid, parse } from "date-fns";
import { useFirebase } from "../../../hooks/use-firebase";
import { FloatingMenuProvider, useFloatingMenu } from "./FloatingMenuContext";
import FloatingMenu from "./FloatingMenu";

type InboxContactProps = {
  inbox: InboxChat;
  onChangeChat?: Function;
  isActive?: boolean;
  isSearchFilter?: boolean;
  messageMatch?: ReactNode[];
  allInbox?: InboxChat;
};

export default function InboxContact(props: InboxContactProps) {
  const context = useContext(InputContext);
  const { setChatSelected } = useChatContext();

  if (!context) {
    throw new Error("Sidebar debe estar dentro de un InputProvider");
  }

  const { inputValue } = context;
  const { onChangeChat, isActive } = props;
  const { name, phone, to, lastMessage, timestamp } = props.inbox;

  const handleChangeChat = () => {
    if (onChangeChat) {
      setChatSelected(props?.inbox?.id);
      onChangeChat(props.inbox);
    }
  };

  const highlightMatch = (text: string): ReactNode[] => {
    const regex = new RegExp(`(${inputValue})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === inputValue.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
  };

  const sortChatData = (data: any[]) => {
    if (data.length === 0) return data;
  
    const DataFilter = data.filter(([_, message]) => message.createdAt);
  
    return DataFilter.sort((a, b) => {
      const dateA = parse(a[1].createdAt, 'dd/MM/yyyy hh:mm:ss a', new Date());
      const dateB = parse(b[1].createdAt, 'dd/MM/yyyy hh:mm:ss a', new Date());
  
      
      if (!isValid(dateA) || !isValid(dateB)) {
        console.error('Invalid date:', a[1].createdAt, b[1].createdAt);
        return 0;
      }
      
      return dateB.getTime() - dateA.getTime();
    });
  };

  const onGetTypeMessage = () => {
    let entries: any = Object?.entries(props?.inbox?.messages || {});

    const lastMessage = entries.length ? sortChatData(entries)[0][1] : null;
    
    if (lastMessage) {
      switch (lastMessage.type) {
        case 'video':
          return (
            <p className="flex">
              <Icon className="!mr-1" id="video" />
              <span className="ml-2">Video</span>
            </p>
          );
        case 'sticker':
          return (
            <p className="flex">
              <Icon className="!mr-1" id="sticker" />
              <span className="ml-2">Sticker</span>
            </p>
          );
        case 'image':
          return (
            <p className="flex">
              <Icon className="!mr-1" id="camera" />
              <span className="ml-2">Foto</span>
            </p>
          );
        default:
          return props?.inbox?.lastMessage || lastMessage?.content;
      }
    }

    return props?.inbox?.lastMessage || props?.inbox?.content;
  };

  return (
    <FloatingMenuProvider>
      <Contact isActive={isActive} onClick={handleChangeChat}>
        <AvatarWrapper>
          <AvatarCustom name={props.inbox?.nickname || props.inbox?.name || props.inbox?.to} />
        </AvatarWrapper>
        <Content>
          <TopContent>
            <Name>{highlightMatch(phone || to || '')} - {props.inbox?.nickname || name}</Name>
            {timestamp && lastMessage ? <Time>{timestamp}</Time> : ''}
          </TopContent>
          <BottomContent>
            <MessageWrapper>
              {props.inbox?.type === 'template' && props.inbox?.data ? 
                <>
                  {/* Código para mostrar mensajes de plantilla */}
                </>
                :
                <>
                  <Message {...props.inbox} lastMessage={onGetTypeMessage()} />
                </>
              }
            </MessageWrapper>
            <Trailing {...props.inbox} />
          </BottomContent>
        </Content>
      </Contact>
      <FloatingMenu />
    </FloatingMenuProvider>
  );
}

function Message(props: Pick<InboxChat, "status" | "messages" | "lastMessage" | "messageMatch">) {
  const { lastMessage, status } = props;

  if (!lastMessage) return <></>;

  return (
    <>
      <p>
        <MessageStatusIcon
          isRead={status === "read"}
          id={status === "sent" ? "singleTick" : "doubleTick"}
        />
      </p>
      <Subtitle>{lastMessage}</Subtitle>
    </>
  );
}

function Trailing(props: Pick<InboxChat, "notificationsCount" | "countMessages" | "phone" | "from" | "isConfirmed">) {
  const { notificationsCount, countMessages, phone, from, isConfirmed } = props;
  const { updateDatabase } = useFirebase(); 
  const { toggleMenu } = useFloatingMenu();

  const handleConfirmedOrder = () => {
    updateDatabase(`${from}/${phone}`, { isConfirmed: !isConfirmed })
      .then(() => {
        console.log("Pedido confirmado exitosamente.");
      })
      .catch((error) => {
        console.error("Error al actualizar el nombre:", error);
      });
  };

  const handleMenuClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleMenu({ top: rect.bottom, left: rect.left });
  };

  return (
    <div className="sidebar-contact__icons" style={{ position: 'relative' }}>
      <StyledButton onClick={handleConfirmedOrder}>
        { isConfirmed && isConfirmed === true ? <>
          <Icon id="pinnedBlue" className="sidebar-contact__icon" />
        </> : <>
          <Icon id="pinned" className="sidebar-contact__icon" />
        </>}
      </StyledButton>
      {countMessages > 0 && <span style={{ marginLeft: '5px' }}>{countMessages || 1}</span>}
      <button aria-label="sidebar-contact__btn" onClick={handleMenuClick}>
        <Icon id="downArrow" className="sidebar-contact__icon sidebar-contact__icon--dropdown" />
      </button>
    </div>
  );
}