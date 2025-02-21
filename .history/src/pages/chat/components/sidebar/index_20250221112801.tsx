import { useLocation, useNavigate } from "react-router-dom";
import { parse, isValid } from 'date-fns';
import { BsFillMoonFill, BsMoon } from "react-icons/bs";
import InboxContact from "./contacts";
import OptionsMenu from "../option-menu";
import SearchField from "../search-field";
import { useAppTheme } from "common/theme";
import { InboxChat } from "common/types/common.type";
import { useChatContext } from "pages/chat/context/chat";
import {
  Actions,
  Avatar,
  ContactContainer,
  Header,
  ImageWrapper,
  InboxFilter,
  SidebarContainer,
  ThemeIconContainer,
} from "./styles";
import { useContext, useEffect, useState, useCallback } from "react";
import { InputContext } from "../../../../pages/chat/context/filter";
import StatusMessage from "../status-message";
import { StateMessageContext } from "../../../../pages/chat/context/filterState";
import { SelectCustom } from "pages/chat/chat-room-page/components/select-custom";
import useIsDesktop from "pages/chat/hooks/useWindowSize";
import { usePhoneNumberWithLoader } from "services/phone-number/getPhoneNumber.service";
import Icon from "common/components/icons";
import ContactNewForm from "../contact-new";

export default function Sidebar() {
  const chatCtx = useChatContext();
  const location = useLocation();

  const context = useContext(InputContext);
  const contextState = useContext(StateMessageContext);
  const isDesktop = useIsDesktop();
  const [changeRoute, setChangeRoute] = useState('')
  const { showNewContactModal, setShowNewContactModal } = useChatContext();

  useEffect(() => {
    setChangeRoute(location.pathname)
  }, [chatCtx.chatSelected, location]);

  if (!context || !contextState) {
    throw new Error("Sidebar debe estar dentro de un InputProvider");
  }

  const { inputValue } = context;
  const { state } = contextState;
  
  const theme = useAppTheme();
  const navigate = useNavigate();

  const [filteredContacts, setFilteredContacts] = useState<InboxChat[]>([]);
  const [filteredChats, setFilteredChats] = useState<InboxChat[]>([]);
  const { putChangeStatusMessage } = usePhoneNumberWithLoader();

  const handleChangeThemeMode = () => {
    theme.onChangeThemeMode();
  };

  const handleChangeChat = (
    async (chat: InboxChat) => {
      if (chat.countMessages > 0) {
        try {
          await putChangeStatusMessage(
            { phoneNumberId: chat.from },
            chat.phone
        );
          
        } catch (error) {
          
        }
      }
      
      chatCtx.setShowModal(false);
      
      if (inputValue !== '') {
        chatCtx.setChatSelected(chat);
      } else {
        chatCtx.setChatSelected(null);
      }
      
      chatCtx.onChangeChat(chat);
      navigate("/" + (chat.phone || chat.to));
    }
  );

  const sortChatData = (data: any[]) => {
    if (data.length === 0) return data;
  
    const DataFilter = data.filter((a) => a.updatedAt )
    
    return DataFilter.sort((a, b) => {
      const dateA = parse(a.updatedAt, 'dd/MM/yyyy hh:mm a', new Date());
          const dateB = parse(b.updatedAt, 'dd/MM/yyyy hh:mm a', new Date());
  
          if (!isValid(dateA) || !isValid(dateB)) {
            console.error('Invalid date:', a.updatedAt, b.updatedAt);
            return 0;
          }
  
          return  dateB.getTime() - dateA.getTime();
    });
  };

  const filterChatsRoot = () => {
    if (!inputValue && state === "all") return sortChatData(chatCtx.data)

    if (!inputValue && state === "not_confirmed") return sortChatData(chatCtx?.data?.filter((chat: InboxChat) => !chat.isConfirmed));

    if (!inputValue && state === "confirmed") return sortChatData(chatCtx?.data?.filter((chat: InboxChat) => chat.isConfirmed && chat.isConfirmed === true));
    
    return sortChatData(chatCtx?.data?.filter((chat: InboxChat) => chat.status === state));
  }

  const filterChats = useCallback(() => {
    if (!inputValue && state === "all") {
      return chatCtx.data;
    }
    
    return  chatCtx?.data
      ?.map((chat: InboxChat) => {
        if (!chat.messages) return; 
        
        const filteredMessages = Object.entries(chat.messages)
          .filter(([_, msg]) => {
            const matchesLocation = msg.type === "location" && (msg.text && 
              msg.text.toLowerCase().includes(inputValue.toLowerCase()) )
            
            const matchesTemplate = 
              msg.type === "template" && 
                (msg.data?.address && 
                msg.data?.address.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.company && 
                msg.data?.company.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.customer && 
                msg.data?.customer.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.department && 
                msg.data?.department.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.district && 
                msg.data?.district.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.note && 
                msg.data?.note.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.orderNumber && 
                msg.data?.orderNumber.toLowerCase().includes(inputValue.toLowerCase()) || 
                msg.data?.products && 
                msg.data?.products.toLowerCase().includes(inputValue.toLowerCase()) ||
                msg.data?.total && 
                msg.data?.total.toString().toLowerCase().includes(inputValue.toLowerCase())
              );
            
            const matchesNickname = 
              msg.nickname && 
              msg.nickname.toLowerCase().includes(inputValue.toLowerCase());

            const matchesText = 
              msg.type === "text" && 
              msg.text && 
              msg.text.toLowerCase().includes(inputValue.toLowerCase());

            const matchesContent = 
              msg.type === "text" && 
              msg.content && 
              msg.content.toLowerCase().includes(inputValue.toLowerCase());

            const matchesState = state === "not_confirmed" ? !msg.isConfirmed : 
              state === "confirmed" ? msg.isConfirmed && msg.isConfirmed === true : 
              state === "all" ? state === "all" : msg.status === state

            return (matchesText || matchesContent || matchesTemplate || matchesLocation || matchesNickname) && matchesState;
          })
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
  
        if (Object.keys(filteredMessages).length > 0) {
          return {
            ...chat,
            messages: filteredMessages,
          };
        }
        return null;
      })
      .filter(Boolean);
    
  }, [inputValue, chatCtx.data, state]);

  const openNewContact = () => {
    setShowNewContactModal(true)
  }

  const filterContacts = useCallback(() => {
    if (!inputValue) {
      return sortChatData(chatCtx.data);
    }
    const filtered = chatCtx.data?.filter((msg) => msg?.phone?.toLowerCase().includes(inputValue.toLowerCase()))

    if (state === "not_confirmed") return sortChatData(filtered.filter( (msg) => !msg.isConfirmed))

    if (state === "confirmed") return sortChatData(filtered.filter( (msg) => msg.isConfirmed && msg.isConfirmed === true))

    if (state !== "all") {
      return sortChatData(filtered.filter( (msg) => msg.status === state))
    }

    return sortChatData(filtered)
  }, [inputValue, chatCtx.data, state]);

  useEffect(() => {
    const filtered = filterChats();
    const filteredContacts = filterContacts();
    
    setFilteredContacts(filteredContacts);
    setFilteredChats(filtered);
  }, [filterChats, filterContacts]);
  
  return (
    <SidebarContainer 
    style={{zIndex: isDesktop ? '' : changeRoute === "/" ? '-1' : '9999'  }}
    
    className={isDesktop ? '' : 'isMobile'}>
      <Header>
        <ImageWrapper>
          <Avatar src="/assets/logo.png" /> 
        </ImageWrapper>
        <Actions>
          <ThemeIconContainer onClick={handleChangeThemeMode}>
            {theme.mode === "light" ? <BsMoon /> : <BsFillMoonFill />}
          </ThemeIconContainer>

          <button aria-label="New chat" onClick={() => openNewContact()}>
            <Icon id="addPlus" className="icon" />
          </button>

          <ContactNewForm 
            onClose={() => setShowNewContactModal(false)}
            isOpen={showNewContactModal}
          />

          <OptionsMenu
            iconClassName="icon"
            className="icon"
            ariaLabel="Menu"
            iconId="menu"
            options={["Cerrar sesión"]}
          />
        </Actions>
      </Header>

      <SearchField />

      <StatusMessage />
      
      <SelectCustom />

      <ContactContainer>
        {
          inputValue === '' 
          ?
          filterChatsRoot()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .filter( (user: any) => user.phone )
          .map((inbox) => (
            <>
            <InboxContact
              key={inbox.phone}
              inbox={inbox}
              isActive={inbox.phone === chatCtx.activeChat?.phone}
              onChangeChat={handleChangeChat}
            />
            </>
          ))
          :
          filteredContacts
        }
      </ContactContainer>
    </SidebarContainer>
  );
}
