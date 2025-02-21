import React, { useEffect, useState } from 'react';
import { Container } from './styles';

const extractUrl = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const urls = text?.match(urlPattern);
  return urls ? urls[0] : null;
};

const UrlPreview = ({ url }: { url: string }) => {
  const [previewData, setPreviewData] = useState<any>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const response = await fetch(
          `https://api.linkpreview.net/?key=3164544ca2b41aab8e35e1f764f7cc4a&q=${url}`
        );        
        const data = await response.json();
        setPreviewData(data);
      } catch (error) {
        console.error('Error fetching preview data:', error);
      }
    };

    if (url) {
      fetchPreviewData();
    }
  }, [url]);

  if (!previewData) {
    return <p>Cargando previsualización...</p>;
  }

  return (
    <Container>
      <a href={previewData.url} target="_blank" rel="noopener noreferrer">
        <img src={previewData.image} alt={previewData.title} />
        <h4>{previewData.title}</h4>
        <p>{previewData.description}</p>
      </a>
      <a href={url} target="_blank" rel="noopener noreferrer"> {url} </a>
    </Container>
  );
};

const MessageComponent = ({ message }: { message: any }) => {
  const url = extractUrl(message);

  return (
    <div className="message">
      {message.text}
      {url && <UrlPreview url={url} />}
    </div>
  );
};

export default MessageComponent;
