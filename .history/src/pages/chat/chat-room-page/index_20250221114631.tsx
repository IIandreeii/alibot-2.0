import { useEffect, useRef, useState } from "react";
import ChatLayout from "../layouts";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Icon from "./../../..common/components/icons";
import useChatRoom from "./hooks/useChatRoom";
import ProfileSection from "./components/profile";
import SearchSection from "./components/search-section";
import useNavigateToChat from "./hooks/useNavigateToChat";
import { Container, Body, Background, FooterContainer, ScrollButton } from "./styles";
import MessagesList from "./components/messages-list";
import useIsDesktop from "../hooks/useWindowSize";
import { useChatContext } from "../context/chat";
import { useLocation } from "react-router-dom";

export default function ChatRoomPage() {
  const {
    activeInbox,
    handleMenuOpen,
    handleShowIcon,
    isProfileOpen,
    isSearchOpen,
    setIsProfileOpen,
    setIsSearchOpen,
    setShouldScrollToBottom,
  } = useChatRoom();

  useNavigateToChat(activeInbox);
  const messagesListRef = useRef<HTMLDivElement>(null);  
  const chatCtx = useChatContext();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const isDesktop = useIsDesktop();
  const [changeRoute, setChangeRoute] = useState('')
  
  useEffect(() => {
    setChangeRoute(location.pathname)
  }, [chatCtx.chatSelected, location]);

  const handleScrollToBottom = () => {
    const currentRef = messagesListRef.current;

    if (!currentRef) return;
    
    setTimeout(() => {
      currentRef.scrollTop = currentRef.scrollHeight;
    }, 100); 
  };

  const handleScroll = () => {
    const currentRef = messagesListRef.current;
    if (!currentRef) return;

    const { scrollHeight, clientHeight, scrollTop } = currentRef;
    const targetScroll = scrollHeight - clientHeight;

    
    if (scrollTop >= targetScroll - 10) {  
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  useEffect(() => {
    const currentRef = messagesListRef.current;

    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  
  useEffect(() => {
    setIsSearchOpen(false)
    if (messagesListRef.current) {
      handleScrollToBottom();
    }
  }, [activeInbox]);

  return (
    <ChatLayout>
      <Container
        className={isDesktop ? '' :  changeRoute !== '/' ? 'isMobile' : '' }>
        <Body>
          <Background />
          <Header
            inbox={activeInbox}
            title={activeInbox?.phone ?? ""}
            image={/*activeInbox?.image ?? ""*/ ''}
            subTitle={/*activeInbox?.isOnline ? "Online" : ""*/ ''}
            onSearchClick={() => handleMenuOpen("search")}
            onProfileClick={() => handleMenuOpen("profile")}
          />

          <MessagesList
            ref={messagesListRef}
            onMessagesLoaded={() => setShouldScrollToBottom(true)}
            searchTerm={searchTerm}  
            filterInChat={true}
          />

          <FooterContainer>
            {
              !isScrolled && 
              <ScrollButton onClick={handleScrollToBottom}>
                <Icon id="downArrow" />
              </ScrollButton>
            }

            <Footer onSendMessage={() => setShouldScrollToBottom(true)} />
          </FooterContainer>
        </Body>

        {
          isSearchOpen && 
          <Sidebar title="Search" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
            <SearchSection />
          </Sidebar>
        }
      
        <Sidebar
          title="Contact Info"
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        >
          <ProfileSection name={activeInbox?.phone ?? ""} image={/*activeInbox?.image ?? ""*/ ''} />
        </Sidebar>
      </Container>
    </ChatLayout>
  );
}
