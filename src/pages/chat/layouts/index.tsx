import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useChatContext } from "../context/chat";
import { App, Content, Message } from "./styles";
import { useLocation } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

export default function ChatLayout(props: { children: any }) {
  const { chatSelected, numberSelected } = useChatContext();
  const location = useLocation();
  const [changeRoute, setChangeRoute] = useState('')
  const isDesktop = useWindowSize();

  useEffect(() => {
    setChangeRoute(location.pathname)
  }, [chatSelected, location]);

  return (
    <App>
      { isDesktop  && <Message>Currently Only available on desktop or large devices 😊.</Message> }
      <Content>
        <Sidebar />
   
        {props.children}
      </Content>
    </App>
  );
}
/*

   {isDesktop ? <Sidebar /> :  changeRoute === '/' ?  <Sidebar /> : <></>  }

   */