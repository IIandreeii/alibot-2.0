import { forwardRef, useRef, useEffect } from "react";
import { Tooltip } from "primereact/tooltip";
import { Menu } from 'primereact/menu';
import Icon from "../../../../../common/components/icons";
import MessageComponent from "../urlMessage";
import AudioMessage from "../audioMessage";
import MapComponent from "../../common/components/map";
import ImageMessage from "../imageMessage";
import StickerMessage from "../stickerMessage";
import VideoMessage from "../videoMessage";
import { Template } from "../templates";
import { ChatMessage, ChatMessageFooter, ButtonContainer } from "../messages-list/styles";
import { MessageChat } from "../messages-list/data/get-messages";
import './styles'; // Importa los estilos personalizados

interface SingleMessageProps {
  message: MessageChat;
  isHighlighted: boolean;
  backgroundColor: string;  // Nueva propiedad para cambiar el color de fondo
  onImageLoad: () => void;
  onVideoLoad: () => void;
  onAudioLoad: () => void;
  onStickerLoad: () => void;
  onMapLoad: () => void;
  onClick?: () => void;
}

const customMenuStyles = `
  .custom-menu .p-menu {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .custom-menu .p-menuitem {
    padding: 10px 20px;
    color: #333;
  }
  
  .custom-menu .p-menuitem .p-menuitem-icon {
    color: #007bff;
  }
  
  .custom-menu .p-menuitem .p-menuitem-text {
    font-weight: 500;
  }
`;

const applyCustomStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = customMenuStyles;
  document.head.appendChild(styleElement);
};

const SingleMessage = forwardRef<HTMLDivElement, SingleMessageProps>(({
  message,
  isHighlighted,
  backgroundColor, // Color de fondo dinámico
  onImageLoad,
  onVideoLoad,
  onAudioLoad,
  onStickerLoad,
  onMapLoad,
  onClick
}, ref) => {
  useEffect(() => {
    applyCustomStyles();
  }, []);

  const verifyTextUrl = (text: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(text);
  };

  const isSentByUser = !message.isOpponent;
  const menu = useRef<Menu>(null);

  const items = [
    { label: 'Info. Mensaje',  command: () => { /* acción para Opción 1 */ } },
    { label: 'Responder',  command: () => { /* acción para Opción 2 */ } },
    { label: 'copiar',  command: () => { /* acción para Opción 3 */ } },
    { label: 'Reaccionar' ,command: () => { /* acción para Opción 3 */ } },
    { label: 'Reenviar',  command: () => { /* acción para Opción 3 */ } },
    { label: 'Fijar',  command: () => { /* acción para Opción 3 */ } },
    { label: 'Destacar',  command: () => { /* acción para Opción 3 */ } },
    { label: 'eliminar',  command: () => { /* acción para Opción 3 */ } },
  ];

  return (
    <ChatMessage
      className={`${message.isOpponent ? "chat__msg--received" : "chat__msg--sent"} ${isHighlighted ? "highlighted-message" : ""}`}
      ref={ref}
      style={{ backgroundColor }}  // Aplicar color de fondo
      onClick={onClick}
    >

      {message?.flagError && (
        <div className="error_send">
          <Tooltip target=".custom-target-icon" position={'left'} className="tooltip_custom" />
          <i className="custom-target-icon pi pi-info-circle" data-pr-tooltip={message?.errorData} />
        </div>
      )}

      {(message.type === "text" || message.type === "button") &&
        (verifyTextUrl(message.text || message.content) ? (
          <MessageComponent message={message.text || message.content} />
        ) : (
          <span dangerouslySetInnerHTML={{__html: message.content || message.text}} />
        ))}

      {message.type === "template" && (
        <Template type={message?.content} content={message} />
      )}

      {message.type === "audio" && (
        <AudioMessage
          urlAudio={message?.urlAudio}
          isDownload={"isDownload" in message}
          onLoad={onAudioLoad}
        />
      )}

      {message.type === "location" && (
        <MapComponent
          lat={message?.latitude}
          lng={message?.longitude}
          onLoad={onMapLoad}
        />
      )}

      {message.type === "image" && message.isOpponent && (
        <ImageMessage
          urlImage={message?.urlImage || message?.content}
          isDownload={("isDownload" in message || (message.status === 'delivered' || message.status === 'read' ))}
          onLoad={onImageLoad}
        />
      )}

      {message.type === "image"  && !message.isOpponent && (
        <ImageMessage
          urlImage={message?.urlImage || message?.content}
          isDownload={("isDownload" in message || (message.status === 'delivered' || message.status === 'read' || message.status === 'sent'))}
          onLoad={onImageLoad}
        />
      )}

      {message.type === "sticker" && (
        <StickerMessage
          urlImage={message?.urlImage}
          isDownload={"isDownload" in message}
          onLoad={onStickerLoad}
        />
      )}

      {message.type === "video" && (
        <VideoMessage
          urlVideo={message?.urlVideo}
          content={message?.content}
          isDownload={"isDownload" in message || !message?.isOpponent}
          onLoad={onVideoLoad}
        />
      )}

      <ChatMessageFooter>
        <span>{message.timestamp}</span>
        {!message.isOpponent && (
          <Icon
            id={`${message.status === "sent" ? "singleTick" : "doubleTick"}`}
            className={`chat__msg-status-icon ${message.status === "read" ? "chat__msg-status-icon--blue" : ""}`}
          />
        )}
      </ChatMessageFooter>

      {isSentByUser && (
        <ButtonContainer>
          <Menu model={items} popup ref={menu} id="popup_menu" className="custom-menu" />
          <button aria-label="sidebar-contact__btn" onClick={(event) => menu.current?.toggle(event)}>
            <Icon id="downArrow" className="sidebar-contact__icon sidebar-contact__icon--dropdown" />
          </button>
        </ButtonContainer>
      )}
    </ChatMessage>
  );
});

export default SingleMessage;