import React, { useEffect, useState } from 'react';
import Icon from 'common/components/icons';
import { Container, ContainerList } from './styles';
import { useChatContext } from 'pages/chat/context/chat';
import { usePhoneNumberWithLoader } from 'services/phone-number/getPhoneNumber.service';
import { useTokenUser } from '../../hooks/useAuth';

export const SelectCustom = () => {
  const { numberSelected, setNumberSelected, onChangeChat } = useChatContext();
  const { getPhoneNumber, getResponse } = usePhoneNumberWithLoader();

  const [hasAction, setHasAction] = useState(true)

  const [showList, setShowList] = useState(false);
  const [selectedText, setSelectedText] = useState(''); 
  const [dataResponse, setDataResponse] = useState<any>()
  const { saveUserID, saveToken, initialToken, setInitialToken } = useTokenUser();
  const [initialNumber, setinitialNumber] = useState('')

  const getData = async () => {
    const response = await getPhoneNumber();
    if (response && response.length > 0 && initialToken === false) {
      const filterData = response.filter((key:any) => key.phoneNumberId === numberSelected)[0];
      const initialData = response[0]?.nickname + " - " + (response[0]?.phone || 'Sin número');
      setinitialNumber(initialData);
  
      if (!filterData) {
        setNumberSelected(response[0].phoneNumberId);
      } else {
        setNumberSelected(filterData?.phoneNumberId);
      }
  
      setDataResponse(response);
      saveToken(filterData?.tokenMeta);
      setSelectedText(filterData?.nickname + " - " + (filterData?.phone || 'Sin número'));
    } else {
      setNumberSelected('0');
    }
  }

  useEffect(() => {
    getData();
  }, []);

/*  useEffect(() => {
    if (numbersKey.length > 0 && hasAction) {
      setSelectedText(numberSelected || numbersKey[0])
    }
  }, [numbersKey])*/

  const toggleList = () => {
    setHasAction(false)
    setShowList(prevState => !prevState);
  };

  const handleSelect = (text: string, token: string, other: string) => {
    onChangeChat(null)
    setNumberSelected(text)
    setSelectedText(text + " " + other);
    setShowList(false);
    saveToken(token)
  };

  return (
    <Container onMouseLeave={() => setShowList(false)}>
      <div onClick={toggleList}>
        <Icon id="archivar" className="search-icon" />
        <p>{selectedText.includes('undefined') ? initialNumber : selectedText}</p>
        <span>{dataResponse?.length}</span>
      </div>
      {showList && (
        <ContainerList>
          {dataResponse?.map( (key:any) => 
              <li onClick={() => handleSelect(key.phoneNumberId, key.tokenMeta, (key.nickname + " - " + (key.phone || 'Sin número')) )} className={key.phoneNumberId === selectedText ? 'active' : ''}>
                {' ' + key.nickname + " - " + (key.phone || 'Sin número')}
              </li>
          )}
        </ContainerList>
      )}
    </Container>
  );
};
