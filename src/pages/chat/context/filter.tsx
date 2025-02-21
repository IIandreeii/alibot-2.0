import React, { createContext, useState, ReactNode } from 'react';

interface InputContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const InputContext = createContext<InputContextType | undefined>(undefined);

interface InputProviderProps {
  children: ReactNode;
}

export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};
