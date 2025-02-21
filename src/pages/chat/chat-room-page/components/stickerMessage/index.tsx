import React from 'react';
import { Skeleton } from 'primereact/skeleton';

interface StickerMessageProps {
  urlImage: string;
  isDownload?: boolean;
  onLoad: () => void;
}

const StickerMessage: React.FC<StickerMessageProps> = ({ urlImage, isDownload, onLoad }) => {
  return (
    <>
      {
        !isDownload
        ? <Skeleton height='80px' width='80px'/>
        : <img 
            className="sticker-image" 
            width={"110px"} 
            src={urlImage} 
            alt="Sticker" 
            onLoad={onLoad}
          />
      }
    </>
  );
};

export default StickerMessage;
