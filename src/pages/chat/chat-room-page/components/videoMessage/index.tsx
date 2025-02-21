import React, { useEffect, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';

interface VideoMessageProps {
    urlVideo: string;
    content: string;
    isDownload?: boolean;
    onLoad?: () => void;
}

const VideoMessage: React.FC<VideoMessageProps> = ({ urlVideo, content, isDownload, onLoad }) => {
    const [isDownloadData, setisDownload] = useState(false)

    useEffect(() => {
        if (isDownload) {
            setisDownload(true)
        }
    }, [urlVideo, isDownload])

  return (
    <>
        {
            isDownloadData
            ?   <video controls width="250" onLoadedData={onLoad}>
                    <source
                        src={content || urlVideo}
                    />
                </video>
            :   <Skeleton height='320px' width='210px'/>
        }
    </>
  );
};

export default VideoMessage;
