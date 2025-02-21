import { forwardRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../../../../common/components/icons";
import { MessageChat } from "./data/get-messages";
import { format, isToday, isYesterday, parse, differenceInCalendarDays } from 'date-fns';
import { es } from 'date-fns/locale';

import {
  Container,
  DateCustom,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";
import { useFirebase } from "../../../../../hooks/use-firebase";
import { objectToArray } from "../../../../../utils/object-to-array";
import { useChatContext } from "../../../../chat/context/chat";
import SingleMessage from "../single-message";

interface MessagesListProps {
  onMessagesLoaded: () => void;  
  searchTerm?: string;  
  filterInChat?: boolean;
}

type Message = {
  content?: string;
  createdAt: string;
  currentMillis: number;
  from: string;
  id: string;
  isOpponent: boolean;
  status: string;
  text?: string;
  timestamp: string;
  to: string;
  type: string;
  errorData?: string;
  flagError?: boolean;
  statusUpdatedAt?: string;
  urlAudio?: string;
  contact?: string;
  urlImage?: string;
  urlVideo?: string;
  urlSticker?: string;
};

const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(
  ({ onMessagesLoaded, filterInChat = true, searchTerm }, ref) => {
    const { getFromDatabase, response } = useFirebase();
    const params = useParams();
    const { numberSelected, chatSelected, setChatSelected } = useChatContext();
    const selectedMessageRef = useRef<HTMLDivElement | null>(null);
    const [visibleMessages, setVisibleMessages] = useState<MessageChat[]>([]);
    const [visibleMessagesGroup, setVisibleMessagesGroup] = useState<Message | any>({});

    const [loadingMore, setLoadingMore] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [messages, setMessages] = useState<MessageChat[]>([]);
    const [highlightedMessage, setHighlightedMessage] = useState<string | null>(null);
    const [mediaLoadingCount, setMediaLoadingCount] = useState(0); 
    const [totalMediaCount, setTotalMediaCount] = useState(0); 
    const [selectedBgColor, setSelectedBgColor] = useState<string>(""); 

    useEffect(() => {
      getFromDatabase(`${numberSelected}/${params.id}/messages`);
    }, [params.id]);

    useEffect(() => {
      const listAll: MessageChat[] = objectToArray<MessageChat>(response);      
    
      interface ParsedDate {
        date: string;
        time: string;
        period: string;
      }

      const parseDate = (dateString: string): Date => {
        const [date, time, period] = dateString.split(' ');
        const [day, month, year]: string[] = date.split('/');
        const [hours, minutes, seconds]: string[] = time.split(':');
        const hours12: number = period === 'AM' 
          ? (parseInt(hours) === 12 ? 0 : parseInt(hours)) // Convertir 12 AM a 0
          : (parseInt(hours) === 12 ? 12 : parseInt(hours) + 12); // Convertir PM a 24 horas
        
        // Crear un nuevo objeto Date en formato adecuado para comparación
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hours12, parseInt(minutes), parseInt(seconds));
      };
    
      const sortedMessages = listAll.sort((a, b) => {
        const dateA = parseDate(a.createdAt);
        const dateB = parseDate(b.createdAt);
    
        return filterInChat
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });

      const messages: Message[] = sortedMessages

      const groupedMessages = messages.reduce((acc, message) => {
        // Extraer solo la fecha (ignorando la hora y minuto)
        const date = message.createdAt.split(' ')[0];  // Suponiendo el formato "DD/MM/YYYY HH:MM:SS"
        
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      }, {} as Record<string, Message[]>);

      setVisibleMessagesGroup(groupedMessages)
      
      setMessages(sortedMessages);
      setInitialLoadComplete(false);
    }, [response]);
    

    const getRefCurrent = (ref: any): HTMLDivElement | null => {
      if (typeof ref === 'function') {
        return null;
      }
      return ref?.current || null;
    };

    const loadMoreMessages = () => {
      if (loadingMore || visibleMessages.length >= messages.length) return;
      setLoadingMore(true);

      const currentRef = getRefCurrent(ref);
      const prevScrollHeight = currentRef?.scrollHeight || 0;

      const newMessages = messages.slice(
        Math.max(messages.length - visibleMessages.length - 10, 0),
        messages.length - visibleMessages.length
      );      

      setVisibleMessages((prev) => [...newMessages, ...prev]);

      setTimeout(() => {
        const newScrollHeight = currentRef?.scrollHeight || 0;
        const scrollDiff = newScrollHeight - prevScrollHeight;

        if (currentRef) {
          currentRef.scrollTop = scrollDiff;
        }

        setLoadingMore(false);
      }, 100);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const currentScrollTop = e.currentTarget.scrollTop;
      if (currentScrollTop === 0) {
        loadMoreMessages(); 
      }
    };

    useEffect(() => {
      if (!chatSelected && !initialLoadComplete && messages.length > 0) {
       
        setVisibleMessages(filterInChat ? messages.slice(-10) : messages);
        setInitialLoadComplete(true);

        setTimeout(() => {
          const currentRef = getRefCurrent(ref);
          if (currentRef) {
            currentRef.scrollTop = currentRef.scrollHeight; 
          }
        }, 100);
      }
    }, [messages, initialLoadComplete, chatSelected]);

    useEffect(() => {
      if (chatSelected) {
        const indexOfSelected = messages.findIndex((msg) => msg.id === chatSelected.id);
    
        if (indexOfSelected !== -1) {
          const selectedVisibleMessages = messages.slice(indexOfSelected, messages.length); 
          setVisibleMessages(selectedVisibleMessages);
    
          setTimeout(() => {
            const currentRef = getRefCurrent(ref);
            if (selectedMessageRef.current && currentRef) {
              currentRef.scrollTop = selectedMessageRef.current.offsetTop - currentRef.clientHeight / 2;
              
              setSelectedBgColor("#c0cbb8");
              setTimeout(() => {
                setSelectedBgColor(""); 
              }, 1000);
            }
          }, 500);
        }
      }
    }, [chatSelected, messages]);

    useEffect(() => {
      if (searchTerm) {
        const foundMessage = messages.find((msg) =>
          msg.content?.toLowerCase().includes(searchTerm.toLowerCase()) || msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const foundMessageFilter = messages.filter((msg) =>
          (msg.content?.toLowerCase().includes(searchTerm.toLowerCase()) || msg.text?.toLowerCase().includes(searchTerm.toLowerCase())) && 
          (msg?.type === "text" || msg?.type === "location")
        )

        
        if (foundMessage) {
          setHighlightedMessage(foundMessage.id);
          const indexOfFoundMessage = messages.findIndex(
            (msg) => msg.id === foundMessage.id
          );

          if (filterInChat) {
            setVisibleMessages( messages.slice(Math.max(0, indexOfFoundMessage - 10), indexOfFoundMessage + 1));
          } else {
            setVisibleMessages(foundMessageFilter)

          }
        
          setTimeout(() => {
            const currentRef = getRefCurrent(ref);
            if (currentRef) {
              currentRef.scrollTop = selectedMessageRef.current?.offsetTop || 0;
            }
          }, 100);
        }
      }
    }, [searchTerm, messages]);
    

    useEffect(() => {
      if (mediaLoadingCount === totalMediaCount && totalMediaCount > 0) {
        setTimeout(() => {
          const currentRef = getRefCurrent(ref);
          if (currentRef) {
            currentRef.scrollTop = currentRef.scrollHeight; 
          }
        }, 100);
      }
    }, [mediaLoadingCount, totalMediaCount]);

    const handleMediaLoad = () => {
      setMediaLoadingCount((prev) => prev + 1);
    };

    useEffect(() => {
      const mediaMessages = visibleMessages.filter(
        (msg) => msg.type === 'image' || msg.type === 'video' || msg.type === 'location'
      );
      setTotalMediaCount(mediaMessages.length);
    }, [visibleMessages]);

    const onSelectedChat = (message: any) => {      
      message.phone = params.id
      setChatSelected(message)
    }

    const formatMessageDate = (date: string) => {
      const formats = ['dd/MM/yyyy hh:mm:ss a', 'dd/MM/yyyy'];  // Lista de formatos posibles
      let parsedDate: Date | null = null;
    
      for (const formatStr of formats) {
        parsedDate = parse(date, formatStr, new Date());
        if (!isNaN(parsedDate.getTime())) {
          break;
        }
      }
    
      if (parsedDate === null || isNaN(parsedDate.getTime())) {
        console.error("Fecha inválida:", date);
        return '';
      }
    
      if (isToday(parsedDate)) {
        return 'Hoy';
      }
    
      if (isYesterday(parsedDate)) {
        return 'Ayer';
      }
    
      const daysDifference = differenceInCalendarDays(new Date(), parsedDate);
    
      if (daysDifference <= 7) {
        // Si la fecha es dentro de la misma semana
        return format(parsedDate, 'EEEE', { locale: es });  // Ejemplo: 'lunes', 'martes'
      }
    
      return format(parsedDate, 'd MMMM yyyy', { locale: es }); // Ejemplo: '11 de junio de 2024'
    };

    return (
      <Container ref={ref} onScroll={handleScroll}>
        {
          filterInChat &&
          <>
            <EncryptionMessage>
              <Icon id="lock" className="icon" />
              Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
            </EncryptionMessage>
          </>
        }
        <MessageGroup>
          {Object.entries(visibleMessagesGroup).map(([date, messages]: any) => (
          <div key={date}>
            <DateWrapper>
              <DateCustom>{formatMessageDate(date)}</DateCustom>
            </DateWrapper>
            <MessageGroup>
                {messages.map((message: Message) => {
                const isSelected = message.id === chatSelected?.id;
                const isHighlighted = message.id === highlightedMessage;
                return (
                  <SingleMessage
                  key={message.id}
                  message={message}
                  ref={isSelected ? selectedMessageRef : null}
                  isHighlighted={isHighlighted}
                  backgroundColor={isSelected ? selectedBgColor : ""} 
                  onImageLoad={handleMediaLoad}
                  onVideoLoad={handleMediaLoad}
                  onAudioLoad={handleMediaLoad}
                  onStickerLoad={handleMediaLoad}
                  onMapLoad={handleMediaLoad}
                  onClick={() => filterInChat ? {} : onSelectedChat(message)}
                  />
                );
                })}
            </MessageGroup>
          </div>
        ))}
        </MessageGroup>

        
      </Container>
    );
  }
);

export default MessagesList;
