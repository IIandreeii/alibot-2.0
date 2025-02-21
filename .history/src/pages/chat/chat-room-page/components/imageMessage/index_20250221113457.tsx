import React, { useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import Icon from '../../.common/components/icons';
import { Dialog } from 'primereact/dialog';

interface ImageMessageProps {
    urlImage: string;
    isDownload?: boolean;
    onLoad: () => void;
}

const ImageMessage: React.FC<ImageMessageProps> = ({ urlImage, isDownload, onLoad }) => {
  const [visible, setVisible] = useState(false);

  const zoomImage = () => {
    setVisible(true)
  }
  
  return (
    <>
    {
      isDownload 
      ? <div className='chat_image'>
          <img
            src={urlImage}
            alt="message"
            onClick={() => zoomImage()}
            className="chat__msg-image"
            width={200}
            onLoad={onLoad}
          />

          <Dialog  visible={visible} style={{ width: 'auto' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <img
              src={urlImage}
              alt="message"
              onClick={() => zoomImage()}
              className="chat__msg-image"
              onLoad={onLoad}
            />
          </Dialog>
      </div>
      :   <Skeleton height='320px' width='250px'/>
      }
    </>
  );
};

export default ImageMessage;
