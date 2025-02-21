import { useChatContext } from "pages/chat/context/chat";
import { useEffect, useState } from "react";
import { useTemplate } from "../services/template/template.service";
import styled from "styled-components";

const ModalContactNewBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContactNewContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhoneInput = styled(InputField)`
  width: 70%;
`;

const CountryCodeSelect = styled.select`
  width: 25%;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2D2E83;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #3C58A4;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #ff5c5c;
  }
`;

const countryCodes = [
  { code: '+51', country: 'Perú' },
  { code: '+1', country: 'EE.UU.' },
  { code: '+34', country: 'España' },
  { code: '+44', country: 'Reino Unido' },
  { code: '+49', country: 'Alemania' },
  { code: '+33', country: 'Francia' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+55', country: 'Brasil' },
  { code: '+81', country: 'Japón' },
  { code: '+7', country: 'Rusia' },
];

const ContactNewForm = ({ onClose, isOpen }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+51');
  const { postNewContact, getContactNew } = useTemplate()
  const { numberSelected } = useChatContext()

  useEffect(() => {
    setName('')
    setPhone('')
    setCountryCode('+51')
  }, [onClose])

  useEffect(() => {
    if (getContactNew !== null) {
      onClose()
    }
  }, [getContactNew])

  const handleSubmit = (e) => {
    e.preventDefault();

    postNewContact({
      phoneNumberId: numberSelected,
      from: `${countryCode}${phone}`.replace('+', ''),
      name: name
    })

  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Elimina todo lo que no sea número
    setPhone(value);
  };

  return (
    <div>
      {isOpen && (
        <ModalContactNewBackground>
          <ModalContactNewContainer>

            <CloseButton onClick={onClose}>&times;</CloseButton>

            <h2>Nuevo contacto</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                placeholder="Nombre"
                value={name}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
            
              <PhoneInputWrapper>
                <CountryCodeSelect
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.code} ({country.country})
                    </option>
                  ))}
                </CountryCodeSelect>
                <PhoneInput
                  type="tel"
                  placeholder="Número de teléfono"
                  value={phone}
                  required={true}
                  onChange={handlePhoneChange}
                />
              </PhoneInputWrapper>

              <Button type="submit">Guardar</Button>
            </form>
          </ModalContactNewContainer>
        </ModalContactNewBackground>)}
    </div>
  );
};

export default ContactNewForm;
