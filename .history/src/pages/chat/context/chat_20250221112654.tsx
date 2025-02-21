import React, { useEffect, useState } from "react";
import { inbox } from "../data/inbox";
import { Inbox, InboxChat } from "../../../common/types/common.type";
import { useFirebase } from "../hooks/use-firebase";
import { objectToArray } from "utils/object-to-array";

type User = {
  name: string;
  image: string;
};

type ChatContextProp = {
  user: User;
  inbox: Inbox[];
  data: any[]
  activeChat?: InboxChat;
  onChangeChat: (chat: any) => void;
  chatSelected: any;
  setChatSelected:any ;
  numberSelected: any;
  setNumberSelected: any;
  numbersKey: string[];
  setNumbersKey: any;
  showModal: boolean;
  setShowModal: any;
  chatIn?: any;
  setChatIn: any;
  searchChat : string;
  setSearchChat: any
  showMessageDialog : boolean;
  setShowMessageDialog: any
  showQuickRespModal: boolean
  setShowQuickRespModal: any
  showNewContactModal: boolean
  setShowNewContactModal: any
};

const initialValue: ChatContextProp = {
  user: { name: "Jazim Abbas", image: "/assets/images/girl.jpeg" },
  inbox,
  data: [],
  onChangeChat() {
    throw new Error();
  },
  chatSelected: '',
  setChatSelected: () => {},
  numberSelected: '0',
  setNumberSelected:  () => {},
  numbersKey: [], 
  setNumbersKey:  () => {},
  showModal: false,
  setShowModal: () => {},
  chatIn: '',
  setChatIn: () => {},
  searchChat: '',
  setSearchChat: () => {},
  showMessageDialog: false,
  setShowMessageDialog: () => {},
  showQuickRespModal: false,
  setShowQuickRespModal: () => {},
  showNewContactModal: false,
  setShowNewContactModal: () => {},
};

export const ChatContext = React.createContext<ChatContextProp>(initialValue);

export default function ChatProvider(props: { children: any }) {
  const { children } = props;
  const { keyList, getFromDatabase, response } = useFirebase()

  const [user] = useState<User>(initialValue.user);
  const [inbox] = useState<Inbox[]>(initialValue.inbox);
  const [data, setData] = useState<any[]>(initialValue.data);
  const [activeChat, setActiveChat] = useState<InboxChat>();
  const [chatSelected, setChatSelected] = useState<InboxChat>();
  const [numberSelected, setNumberSelected] = useState<string>(initialValue.numberSelected);
  const [numbersKey, setNumbersKey] = useState<string[]>(keyList)
  const [showModal, setShowModal] = useState(false);
  
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showQuickRespModal, setShowQuickRespModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);

  const [chatIn, setChatIn] = useState<InboxChat>();
  const [searchChat, setSearchChat] = useState<any>();

  const handleChangeChat = (chat: InboxChat) => {
    setActiveChat(chat);
  };

  useEffect(() => {    
    setNumbersKey(keyList)
  }, [keyList])
  

  useEffect(() => {
    getFromDatabase(numberSelected)
  }, [numberSelected])

  useEffect(() => {
    const listAll: InboxChat[] = objectToArray<InboxChat>(response)
    
    setData(listAll)
  }, [response, numberSelected])

  return (
    <ChatContext.Provider value={{ user, inbox, data, activeChat, onChangeChat: handleChangeChat, 
      chatSelected, setChatSelected, numberSelected, setNumberSelected, numbersKey, setNumbersKey, 
      showModal, setShowModal, chatIn, setChatIn, searchChat, setSearchChat,
      showMessageDialog, setShowMessageDialog, showQuickRespModal, setShowQuickRespModal, showNewContactModal, 
      setShowNewContactModal
     }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);
