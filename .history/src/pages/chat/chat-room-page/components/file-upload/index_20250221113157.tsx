import Icon from '../../../../../common/components/icons';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'libs/firebase';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: end;
  z-index: 110;
`;

const ModalContent = styled.div`
  height: 91vh;
  background: #e9edef;
  padding: 20px;
  width: 100%;
  text-align: center;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const PreviewItem = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  margin: 0px 10px;
  position: relative;
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ea0038;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  svg {
    font-size: 12px;
  }
`;

const LargePreview = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  img, video {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Input = styled.input`
  width: 60%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: auto;
  background: white;
`;

const Button = styled.button`
  position: absolute;
  top: 60px;
  left: 20px;
`;

const ButtonSend = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: #00a884;
  color: white;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(11, 20, 26,.4);
  @media (max-width: 768px) {
    position: fixed;
  }
`;

const FileUploadSquare = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border: 1px solid #d1d7db;
  border-radius: 8px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s;
  color: #d1d7db;
  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileUploadModal = ({ files, setFiles, onClose, onSend, isOpen }) => {
  const [description, setDescription] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      files?.map((file: any) => {
        if (file?.type === 'image/jpeg' || file?.type === 'image/png') {
          setSelectedPreview({
            url: URL.createObjectURL(file),
            type: 'image',
          });
        } else {
          setSelectedPreview({
            url: URL.createObjectURL(file),
            type: 'video',
          });
        }
      });
    } else {
      setSelectedPreview(null);
    }
  }, [files]);

  const uploadFileToFirebase = async (file: File) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileType = file.type.includes('image') ? 'image' : 'video';
          resolve({ url: downloadURL, type: fileType });
        }
      );
    });
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const uploadedFiles = await Promise.all(files.map(file => uploadFileToFirebase(file)));

      onSend(uploadedFiles, description, 'file');
      setFiles([]);
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isUploading) {
      handleUpload();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (files.length + newFiles.length > 3) {
      alert('Puedes seleccionar un máximo de 3 archivos.');
    } else {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handlePreviewClick = (file: File) => {
    if (file?.type.includes('image')) {
      setSelectedPreview({
        url: URL.createObjectURL(file),
        type: 'image',
      });
    } else {

    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const onCloseAndClear = () => {
    setDescription('');
    setFiles([]);
    onClose();
  };

  return (
    isOpen && (
      <ModalContainer>
        <ModalContent tabIndex={0} onKeyDown={handleKeyDown}>
          {selectedPreview && (
            <LargePreview>
              {selectedPreview.type === 'video' ? (
                <video controls src={selectedPreview.url} />
              ) : (
                <img src={selectedPreview.url} alt="Vista previa" />
              )}
            </LargePreview>
          )}

          <PreviewContainer>
            {files.map((file, index) => (
              <PreviewItem key={index} onClick={() => handlePreviewClick(file)}>
                {file.type.includes('video') ? (
                  <video src={URL.createObjectURL(file)} controls={false} />
                ) : (
                  <img src={URL.createObjectURL(file)} alt="Vista previa" />
                )}
                <RemoveButton
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                >
                  <Icon id="cancel" className="icon" />
                </RemoveButton>
              </PreviewItem>
            ))}
            {files.length < 3 && (
              <FileUploadSquare>
                <HiddenFileInput
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  multiple
                />
                <span style={{ fontSize: '32px', color: '#646769' }}>+</span>
              </FileUploadSquare>
            )}
          </PreviewContainer>

          <ButtonSend onClick={handleUpload} disabled={isUploading}>
            {isUploading ? <Icon id="loader" className="icon" /> : <Icon id="send" className="icon" />}
          </ButtonSend>
          <Button onClick={onCloseAndClear}>
            <Icon id="cancel" className="icon" />
          </Button>
        </ModalContent>
      </ModalContainer>
    )
  );
};

export default FileUploadModal;
