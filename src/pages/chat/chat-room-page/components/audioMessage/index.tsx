import React from 'react';
import { Skeleton } from 'primereact/skeleton';

interface AudioMessageProps {
    urlAudio: string;
    isDownload?: boolean;
    onLoad?: () => void;
}

const AudioMessage: React.FC<AudioMessageProps> = ({ urlAudio, isDownload, onLoad }) => {
  return (
    <>
        {
            isDownload
            ?   <audio
                    style={{ width: '336px', maxWidth: '100%' }}
                    controls
                    onLoadedData={onLoad}
                >
                    <source src={urlAudio} type="audio/ogg" />
                    Your browser does not support the audio element.
                </audio>
            :   <Skeleton height='40px' width='250px'/>
        }
    </>
  );
};

export default AudioMessage;
