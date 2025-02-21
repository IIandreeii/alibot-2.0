import { useEffect, useState } from "react";
import { ModalContainer, ListItem, CloseButton, ModalBackground, Tabs, Tab, TabContent, List, SearchInput } from "./styles";
import { useTemplate } from "../../../../services/template/template.service";
import Icon from "common/components/icons";

const QuickResponseModal = ({ onClose, onSend, isOpen, phoneNumber }) => {
  const { getRespuestaRapidaByPhoneNumber, getResponse, getTemplateByPni } = useTemplate();
  const [activeTab, setActiveTab] = useState('tab1')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {

    setSearchTerm('')

    if (activeTab === 'tab1') {
      getRespuestaRapidaByPhoneNumber(phoneNumber)
    } else {
      getTemplateByPni(phoneNumber)
    }
    
  }, [activeTab])

  const handleSelectItemQuick = (item) => {
    onSend('text', item.keyword)
  }

  const handleSelectItemTemplate = (item) => {
    onSend('template', item.name)
  }

  const filteredItems = getResponse.filter(item =>
    item.keyword && item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>  
      {isOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            
            <Tabs>
              <Tab isActive={activeTab === 'tab1'} onClick={() => setActiveTab('tab1')}>
                Respuesta rápida
              </Tab>
              <Tab isActive={activeTab === 'tab2'} onClick={() => setActiveTab('tab2')}>
                Plantilla
              </Tab>
            </Tabs>

            <SearchInput
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {activeTab === 'tab1' ? (
              <TabContent>
                <List>
                  {filteredItems.map((item) => (
                    <ListItem key={item.id} onClick={() => handleSelectItemQuick(item)}>
                      <div style={{ display: 'flex' }}>
                        {item.keyword} {item.isConfirmed ? <>
                          <Icon id='checkCircle' />
                        </> : ''}
                      </div>
                    </ListItem>
                  ))}
                </List>
              </TabContent>
            ) : (
              <TabContent>
                <List>
                {filteredItems.map((item) => (
                  <ListItem key={item.id} onClick={() => handleSelectItemTemplate(item)}>
                    {item.name} {item.templateType === 'agency' ? '(agencia)' 
                    : (item.templateType === 'cash_on_delivery' ? '(contraentrega)' : '')}
                  </ListItem>
                ))}
                </List>
              </TabContent>
            )}
                
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
};

export default QuickResponseModal;
  