import { useEffect, useState } from "react";
import Icon from "common/components/icons";
import { AttachButton, Button, ButtonsContainer, Divider, IconsWrapper, Input, SendMessageButton, SendQuickResponsButton, Wrapper } from "./styles";
import { useParams } from "react-router-dom";
import { environment } from "environments/environment.prod";
import { useChatContext } from "pages/chat/context/chat";
import FileUploadModal from "../file-upload";
import { useSendMessage } from "services/send-message/send-message.service";
import { useTokenUser } from "../../hooks/useAuth";
import Cookies from 'js-cookie'; 
import QuickResponseModal from "../quick-response";

const attachButtons = [
  { icon: "attachDocument", label: "Documentos" },
  { icon: "attachImage", label: "Fotos y videos" },
];

type FooterProps = {
  onSendMessage: Function;
};

export default function Footer({ onSendMessage }: FooterProps) {
  const { numberSelected, showModal, setShowModal, showQuickRespModal, setShowQuickRespModal } = useChatContext();
  const [showIcons, setShowIcons] = useState(false);
  const [valueText, setValueText] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { sendMessage } = useSendMessage();
  const params = useParams();
  const { token } = useTokenUser();

  const handleQuickResponseModal = () => {
    setIsRotated(false);
    setShowQuickRespModal(true);
    setShowIcons(false);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); 
    const files = Array.from(event.target.files || []);
  
    setIsRotated(false)
    if (selectedFiles.length + files.length <= 10) {
      setSelectedFiles((prev) => [...prev, ...files]);
      setShowModal(true);
      setShowIcons(false); 
      
    } else {
      alert("Puedes seleccionar un máximo de 10 archivos.");
    }
  };

  useEffect(() => {
    if (showModal === false) {
      setSelectedFiles([]);
      onSendMessage();
    }
  }, [showModal, onSendMessage]);

  useEffect(() => {
    if (showQuickRespModal === false) {
      onSendMessage();
    }
  }, [showQuickRespModal, onSendMessage]);

  const handleAttachClick = () => {    
    setShowIcons(!showIcons);
    setIsRotated(!isRotated);
  };

  const handleSendQuickResponse = (type: string, text: string) => {
    if (text !== '') {
      sendMessage({
        phoneNumberId: numberSelected,
        tokenMeta: token,
        phone: params.id,
        text: text,
        type: type,
      });
    }

    onSendMessage();
    setShowQuickRespModal(false)
  }

  const handleSend = (urls: string[], description: string, fileType: string) => {
    
    if (urls?.length > 0) {
      urls.forEach((file: any) => {
        if (file?.type === 'image') {
          sendMessage({
            phoneNumberId: numberSelected,
            tokenMeta: token,
            phone: params.id,
            urlImage: file?.url,
            type: 'image',
          });
        } else {
          sendMessage({
            phoneNumberId: numberSelected,
            tokenMeta: token,
            phone: params.id,
            urlVideo: file?.url,
            type: 'video',
            text: ''
          });
        }
      });
    }

    if (valueText !== '') {
      sendMessage({
        phoneNumberId: numberSelected,
        tokenMeta: token,
        phone: params.id,
        text: valueText,
        type: 'text',
      });
      setValueText("");
    }

    setSelectedFiles([]);
    onSendMessage();
    setShowModal(false);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && valueText.trim() !== '') {
      handleSend([], "", "text");
      event.preventDefault(); 
    }
  };

  const handleButtonsContainerClick = (event: React.MouseEvent) => {
    setShowIcons(false); 
    setIsRotated(false)
  };

  return (
    <>
      <Wrapper>
        <IconsWrapper className="IconsWrapper">
          <AttachButton onClick={handleAttachClick} isRotated={isRotated}>
            <Icon id="cancel" className="icon" />
          </AttachButton>
          {showIcons && (
            <ButtonsContainer>
              <div onClick={handleButtonsContainerClick} />
              <div>
                {attachButtons.map((btn, index) => (
                  <div key={btn.label}>
                    <Button>
                      <Icon id={btn.icon} />
                      <input
                        type="file"
                        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z"
                        onChange={handleFileChange}
                        onClick={(e) => e.stopPropagation()} 
                        style={{ display: "none" }}
                        id={`fileInput-${index}`}
                        multiple
                      />
                      <label htmlFor={`fileInput-${index}`}>{btn.label}</label>
                    </Button>
                    {index < attachButtons.length - 1 && <Divider />} {/* Agrega la línea divisoria */}
                  </div>
                ))}
              </div>
            </ButtonsContainer>
          )}

        </IconsWrapper>
        <Input
          placeholder="Escribe un mensaje"
          value={valueText}
          onChange={(e) => setValueText(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <SendMessageButton onClick={() => handleSend([], "", "text")}>
          <Icon id="send" className="icon" />
        </SendMessageButton>
        <SendQuickResponsButton onClick={() => handleQuickResponseModal()}>
          <Icon id="bot" className="icon" />
        </SendQuickResponsButton>
      </Wrapper>

      <FileUploadModal
        files={selectedFiles}
        setFiles={setSelectedFiles}
        onClose={() => setShowModal(false)}
        onSend={handleSend}
        isOpen={showModal}
      />

      <QuickResponseModal
        onClose={() => setShowQuickRespModal(false)}
        onSend={handleSendQuickResponse}
        isOpen={showQuickRespModal}
        phoneNumber={numberSelected}
      />

    </>
  );
}