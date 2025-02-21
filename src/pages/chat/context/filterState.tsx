import React, { createContext, useState, ReactNode } from 'react';

export type StateMessage = 'all' | 'sent' | 'read' | 'not_confimed' | 'confirmed';

interface StateMessageContextType {
  state: any;
  setState: (value: StateMessage) => void;
}

export const StateMessageContext = createContext<StateMessageContextType | undefined>(undefined);

interface StateMessageProviderProps {
  children: ReactNode;
}

export const StateMessageProvider: React.FC<StateMessageProviderProps> = ({ children }) => {
  const [state, setState] = useState<any>('all');

  return (
    <StateMessageContext.Provider value={{ state, setState }}>
      {children}
    </StateMessageContext.Provider>
  );
};
