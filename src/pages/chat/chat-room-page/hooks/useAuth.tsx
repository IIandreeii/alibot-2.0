
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'; 

interface AuthContextType {
  idUser: number;
  token: string | null;
  saveUserID: (userID: number, expiresInDays?: number) => void;
  saveToken: (userToken: string, expiresInDays?: number) => void;
  initialToken: boolean;
  setInitialToken: (initialToken: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface TokenUserProviderProps {
  children: ReactNode;
}

export const TokenUserProvider: React.FC<TokenUserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [idUser, setIdUSer] = useState<number>(1);
  const [initialToken, setInitialToken] = useState<boolean>(false);

  const saveToken = (userToken: string, expiresInDays = 7) => {
    Cookies.set('authToken', userToken, { expires: expiresInDays });
    setToken(userToken); 
  };

  const saveUserID = (userID: number, expiresInDays = 7) => {
    Cookies.set('authId', userID, { expires: expiresInDays });
    setIdUSer(userID); 
  };

  const logout = () => {
    Cookies.remove('authToken');
    setToken(null); 
  };
  
  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    const storedID = Cookies.get('authId');

    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedID) {
      setIdUSer(storedID);
    }
  }, [idUser, token]);

  return (
    <AuthContext.Provider value={{ idUser, saveUserID, token, saveToken, logout, initialToken, setInitialToken }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useTokenUser = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useTokenUser must be used within an TokenUserProvider');
  }
  return context;
};
